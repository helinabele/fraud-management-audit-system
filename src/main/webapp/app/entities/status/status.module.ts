import { NgModule } from "@angular/core";
import { SharedModule } from "app/shared/shared.module";
import { StatusComponent } from "./status.component";
import { RouterModule } from "@angular/router";
import { statusRoute } from "./status.route";

@NgModule({
    imports: [SharedModule,  RouterModule.forChild([statusRoute])],
    declarations: [
        StatusComponent,
    ]
})

export class StatusModule {}