package org.audit.app.domain.enumeration;

public enum ReportStatus {
    INITIATED("Initiated"),
    STARTED("Started"),
    ON_PROGRESS("On Progress"),
    IMPLEMENTED("Implemented"),
    CLOSED("Closed"),
    REJECTED("Rejected");

   private final String status;

    ReportStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return status;
    }
}
