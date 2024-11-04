import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';
import { FraudInvestigationReportFormService, FraudInvestigationReportFormGroup } from './fraud-investigation-report-form.service';
import { IFraudInvestigationReport } from '../fraud-investigation-report.model';
import { FraudInvestigationReportService } from '../service/fraud-investigation-report.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { IEmployee } from 'app/entities/employee/employee.model';
import { EmployeeService } from 'app/entities/employee/service/employee.service';
import { ITask } from 'app/entities/task/task.model';
import { TaskService } from 'app/entities/task/service/task.service';
import { ITeam } from 'app/entities/team/team.model';
import { TeamService } from 'app/entities/team/service/team.service';
import { ISignature } from 'app/entities/signature/signature.model';
import { SignatureService } from 'app/entities/signature/service/signature.service';
import { User } from 'app/entities/user/user.model';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ITEM_CONFIRMED_EVENT } from 'app/config/navigation.constants';
import { IWhistleBlowerReport } from 'app/entities/whistle-blower-report/whistle-blower-report.model';
import { WhistleBlowerReportService } from 'app/entities/whistle-blower-report/service/whistle-blower-report.service';
import { IAssignTask } from 'app/entities/assign-task/assign-task.model';
import { AssignTaskService } from 'app/entities/assign-task/service/assign-task.service';

@Component({
  selector: 'jhi-fraud-investigation-report-update',
  templateUrl: './fraud-investigation-report-update.component.html',
})
export class FraudInvestigationReportUpdateComponent implements OnInit {
  isSaving = false;
  isSubmitted = false; // Track if the report is submitted
  fraudInvestigationReport: IFraudInvestigationReport | null = null;
  employee: IEmployee[] | undefined | null = [];
  employeesSharedCollection: IEmployee[] = [];
  tasksSharedCollection: ITask[] = [];
  teamsSharedCollection: ITeam[] = [];
  selectedEmployees: IEmployee[] = [];
  selectedItems: any[] = [];
  dropdownSettings = {};
  nameOfMembers: IEmployee[] | undefined | null = [];
  signature: ISignature[] | undefined | null = [];
  editForm: FraudInvestigationReportFormGroup = this.fraudInvestigationReportFormService.createFraudInvestigationReportFormGroup();

  comments: string[] = [];
  objectiveComments: string[] = [];
  currentUser: User | null = null;
  openSections: Set<string> = new Set([
    'introduction',
    'objective',
    'scope',
    'limitation',
    'methodology',
    'findingAndAnalysis',
    'conclusion',
    'recommendation',
    ''
  ]);

  assignTask: IAssignTask | undefined;
  whistleBlowerReport: IWhistleBlowerReport | null = null;
  task: ITask | null = null;

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected fraudInvestigationReportService: FraudInvestigationReportService,
    protected fraudInvestigationReportFormService: FraudInvestigationReportFormService,
    protected employeeService: EmployeeService,
    protected taskService: TaskService,
    protected teamService: TeamService,
    protected activatedRoute: ActivatedRoute,
    protected signatureService: SignatureService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    protected whistleBlowerReportService: WhistleBlowerReportService,
    private assignTaskService: AssignTaskService,
    private router: Router
  ) { }

  compareEmployee = (o1: IEmployee | null, o2: IEmployee | null): boolean => this.employeeService.compareEmployee(o1, o2);

  compareTask = (o1: ITask | null, o2: ITask | null): boolean => this.taskService.compareTask(o1, o2);

  compareTeam = (o1: ITeam | null, o2: ITeam | null): boolean => this.teamService.compareTeam(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ fraudInvestigationReport }) => {
      this.fraudInvestigationReport = fraudInvestigationReport;
      if (fraudInvestigationReport) {
        this.updateForm(fraudInvestigationReport);
        this.comments = fraudInvestigationReport.comments || [];
        this.objectiveComments = fraudInvestigationReport.objectiveComments || [];
      }
  
      const userString = localStorage.getItem('user');
      if (userString) {
        this.currentUser = JSON.parse(userString) as User;
      }
  
      this.loadRelationshipsOptions();
      this.loadEmployees();
      this.setSelectedEmployees();
    });
  
    this.activatedRoute.queryParams.subscribe(params => {
      const whistleBlowerReportId = params['whistleBlowerReportId'];
      const taskId = params['taskId'];
  
      if (whistleBlowerReportId) {
        this.whistleBlowerReportService.find(whistleBlowerReportId).subscribe(response => {
          this.whistleBlowerReport = response.body;
        });
      }
  
      if (taskId) {
        // Fetch the task by ID and set it in the form
        this.taskService.find(taskId).subscribe(response => {
          const task = response.body;
          if (task) {
            this.editForm.patchValue({ task }); // Update the form control with the fetched task
          }
        });
      }
    });
  }
  
  

  /*     ngOnInit(): void {
        this.activatedRoute.data.subscribe(({ fraudInvestigationReport, task }) => {
          this.fraudInvestigationReport = fraudInvestigationReport;
          if (fraudInvestigationReport) {
            this.updateForm(fraudInvestigationReport);
            this.comments = fraudInvestigationReport.comments || [];
            this.objectiveComments = fraudInvestigationReport.objectiveComments || [];
          }
          if (task && this.fraudInvestigationReport) { 
            // Set the task from assignTask, checking fraudInvestigationReport is not null
            this.fraudInvestigationReport.task = task;
            this.updateForm(this.fraudInvestigationReport);
          }
      
          const userString = localStorage.getItem('user');
          if (userString) {
            this.currentUser = JSON.parse(userString) as User;
          }
          this.loadRelationshipsOptions();
          this.loadEmployees();
          this.setSelectedEmployees();
        });
      
        this.activatedRoute.queryParams.subscribe(params => {
          const whistleBlowerReportId = params['whistleBlowerReportId'];
          if (whistleBlowerReportId) {
            this.whistleBlowerReportService.find(whistleBlowerReportId).subscribe(response => {
              this.whistleBlowerReport = response.body;
            });
          }
        });
      }
       */


  /*   addComment(): void {
      const newCommentControl = this.editForm.get('newComment');
      const newComment = newCommentControl!.value?.trim();
      if (newComment) {
        this.comments.push(newComment);
        this.editForm.patchValue({ comments: this.comments });
        newCommentControl!.reset();
      }
    } */

  /*addObjectiveComment(): void {
     const newCommentControl1 = this.editForm.get('newObjectiveComment');
    const newObjectiveComment = newCommentControl1!.value?.trim();
    if (newObjectiveComment) {
      this.objectiveComments.push(newObjectiveComment);
      this.editForm.patchValue({ objectiveComments: this.objectiveComments });
      newCommentControl1!.reset();
    }
  } */


  /*   addComment(): void {
      const newCommentControl = this.editForm.get('newComment');
      const newComment = newCommentControl!.value?.trim();
  
      if (newComment && this.currentUser) {
        const newCommentWithAuthor = `${newComment} - ${this.currentUser.login}`;
  
        // Assuming direct manipulation for simplicity; consider using service for API calls
        this.comments.push(newCommentWithAuthor);
        console.log('Updated Comments:', this.comments);
        this.editForm.patchValue({ comments: this.comments });
        newCommentControl!.reset();
      }
    }
  
    addObjectiveComment(): void {
      const newCommentControl = this.editForm.get('newComment');
      const newComment = newCommentControl!.value?.trim();
  
      if (newComment && this.currentUser) {
        const newCommentWithAuthor = `${newComment} - ${this.currentUser.login}`;
  
        // Assuming direct manipulation for simplicity; consider using service for API calls
        this.comments.push(newCommentWithAuthor);
        console.log('Updated Comments:', this.comments);
        this.editForm.patchValue({ comments: this.comments });
        newCommentControl!.reset();
      }
    } */

  addComment(commentType: 'comments' | 'objectiveComments'): void {
    const newCommentControl = this.editForm.get(commentType === 'comments' ? 'newComment' : 'newObjectiveComment');
    const newComment = newCommentControl!.value?.trim();

    if (newComment && this.currentUser) {
      const newCommentWithAuthor = `${newComment} - ${this.currentUser.login}`;

      if (commentType === 'comments') {
        this.comments.push(newCommentWithAuthor);
      } else {
        this.objectiveComments.push(newCommentWithAuthor);
      }

      console.log('Updated Comments:', commentType === 'comments' ? this.comments : this.objectiveComments);
      newCommentControl!.reset();
    }
  }


  /*   addDynamicControls(fields: string[]): void {
      fields.forEach(field => {
        this.editForm.addControl(`newComment${field}`, new FormControl<string | null>(null));
        this.editForm.addControl(`comments${field}`, new FormControl<string[]>([]));
      });
    }

    addComment(field: string): void {
      const newCommentControl = this.editForm.get(`newComment${this.capitalize(field)}`) as FormControl<string | null>;
      const commentsControl = this.editForm.get(`comments${this.capitalize(field)}`) as FormControl<string[]>;

      if (newCommentControl && commentsControl) {
        const newComment = (newCommentControl.value ?? '').trim();
        if (newComment) {
          const comments = commentsControl.value ?? [];
          comments.push(newComment);
          commentsControl.setValue(comments);
          newCommentControl.reset();
        }
      }
    }

    capitalize(str: string): string {
      return str.charAt(0).toUpperCase() + str.slice(1);
    } */

  loadEmployees(): void {
    this.employeeService
      .query()
      .pipe(map((res: HttpResponse<IEmployee[]>) => res.body ?? []))
      .subscribe((employees: IEmployee[]) => {
        this.employee = employees;
        this.setSelectedEmployees();
      });
  }

  setSelectedEmployees(): void {
    if (this.fraudInvestigationReport && this.employee) {
      const selectedEmployeeIds = this.fraudInvestigationReport.employee?.map(employee => employee.id) ?? [];
      this.selectedEmployees = this.employee.filter(employee => selectedEmployeeIds.includes(employee.id));
      this.selectedItems = this.selectedEmployees.map(employee => employee.id);
    }
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  toggleSection(section: string): void {
    if (this.isSectionOpen(section)) {
      this.openSections.delete(section);
    } else {
      this.openSections.add(section);
    }
  }

  isSectionOpen(section: string): boolean {
    return this.openSections.has(section);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe({
      error: (err: FileLoadError) =>
        this.eventManager.broadcast(new EventWithContent<AlertError>('fraudMgtApp.error', { ...err, key: 'error.file.' + err.key })),
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(event: Event): void {
    event.preventDefault();
    this.isSaving = true;
    const fraudInvestigationReport = this.fraudInvestigationReportFormService.getFraudInvestigationReport(this.editForm);
    // Attach the whistleBlowerReport to the fraudInvestigationReport
    if (this.whistleBlowerReport) {
      fraudInvestigationReport.whistleBlowerReport = this.whistleBlowerReport;
    }

    if (fraudInvestigationReport.id !== null) {
      this.subscribeToSaveResponse(this.fraudInvestigationReportService.update(fraudInvestigationReport));
    } else {
      this.subscribeToSaveResponse(this.fraudInvestigationReportService.create(fraudInvestigationReport));
    }
  }
  // Submit action with confirmation and status change
  confirmSubmit(event: Event): void {
    event.preventDefault();

    // Open confirmation dialog
    const modalRef = this.modalService.open(ConfirmationDialogComponent);
    modalRef.componentInstance.message = 'Are you sure you want to submit? Once submitted, no further edits will be allowed.';

    modalRef.result.then((result) => {
      if (result === ITEM_CONFIRMED_EVENT) {
        this.submit(event);
      }
    }, (reason) => {
      // Handle dismiss
    });
  }

  // Submit logic
  submit(event: Event): void {
    event.preventDefault();
    this.isSaving = true;

    const fraudInvestigationReport = this.fraudInvestigationReportFormService.getFraudInvestigationReport(this.editForm);

    // Set status to IMPLEMENTED for submission
    // fraudInvestigationReport. = 'IMPLEMENTED';

    // Save with status change
    if (fraudInvestigationReport.id !== null) {
      this.subscribeToSaveResponse(this.fraudInvestigationReportService.update(fraudInvestigationReport));
    } else {
      this.subscribeToSaveResponse(this.fraudInvestigationReportService.create(fraudInvestigationReport));
    }

    // After submission, disable further editing
    this.isSubmitted = true;
    this.editForm.disable(); // Disable form inputs after submission
  }

  onEmployeeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const selectedOptions = Array.from(target.selectedOptions);
    const selectedEmployeeIds = selectedOptions.map(option => option.value);

    // Now you have the array of selected employee IDs
    //     console.log(selectedEmployeeIds);
  }
  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFraudInvestigationReport>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(fraudInvestigationReport: IFraudInvestigationReport): void {
    this.fraudInvestigationReport = fraudInvestigationReport;
    this.fraudInvestigationReportFormService.resetForm(this.editForm, fraudInvestigationReport);

    this.tasksSharedCollection = this.taskService.addTaskToCollectionIfMissing<ITask>(
      this.tasksSharedCollection,
      fraudInvestigationReport.task
    );
    this.teamsSharedCollection = this.teamService.addTeamToCollectionIfMissing<ITeam>(
      this.teamsSharedCollection,
      fraudInvestigationReport.team
    );

    if (fraudInvestigationReport.employee) {
      if (Array.isArray(fraudInvestigationReport.employee)) {
        fraudInvestigationReport.employee.forEach(employee => {
          this.employeesSharedCollection = this.employeeService.addEmployeeToCollectionIfMissing<IEmployee>(
            this.employeesSharedCollection,
            employee
          );
        });
      } else {
        this.employeesSharedCollection = this.employeeService.addEmployeeToCollectionIfMissing<IEmployee>(
          this.employeesSharedCollection,
          fraudInvestigationReport.employee
        );
      }
    }

    this.selectedEmployees = fraudInvestigationReport.employee ?? [];
  }

  protected loadRelationshipsOptions(): void {

    this.taskService
      .query()
      .pipe(map((res: HttpResponse<ITask[]>) => res.body ?? []))
      .pipe(
        map((tasks: ITask[]) =>
          this.taskService.addTaskToCollectionIfMissing<ITask>(tasks, this.fraudInvestigationReport?.task)
        )
      )
      .subscribe((tasks: ITask[]) => (this.tasksSharedCollection = tasks));

    this.teamService
      .query()
      .pipe(map((res: HttpResponse<ITeam[]>) => res.body ?? []))
    // .pipe(map((teams: ITeam[]) => this.teamService.addTeamToCollectionIfMissing<ITeam>(teams, this.fraudInvestigationReport?.team)))
    // .subscribe((teams: ITeam[]) => (this.teamsSharedCollection = teams));

    // this.signatureService
    // .query()
    // .pipe(map((res: HttpResponse<ISignature[]>) => res.body ?? []))
    // .pipe((map((signatures: ISignature[])) => this.signatureService.addSignatureToCollectionIfMissing<ISignature>(signatures, this.fraudInvestigationReport?.signature)))
    // .subscribe((signatures: ISignature[]) => (this.signatureSharedCollection = signatures));


    this.signatureService
      .query()
      .pipe(map((res: HttpResponse<ISignature[]>) => res.body ?? []))
      .subscribe((signatures: ISignature[]) => {
        this.signature = signatures;
      })
  }
}
