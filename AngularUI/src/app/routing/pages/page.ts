import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { store } from "src/app/indexeddb";
import { ErrorComponent } from "../popups/error/error.component";
import { InfoComponent } from "../popups/info/info.component";
import { AuthService } from "../services/auth.service";

export class Page {
    protected router: Router;
    protected snackbar: MatSnackBar;

    constructor(router: Router,
                snackbar: MatSnackBar) {
        this.router = router;
        this.snackbar = snackbar;
        store.appEvents('showError').subscribe((...args: any[]) => {
            this.snackbar.openFromComponent(ErrorComponent, {
                duration: 3000, 
                verticalPosition: "top",
                panelClass: ['white-snackbar'],
                data: args[0].detail || args[0].message || 'Unexpected error'
            });
        });
        store.appEvents('showInfo').subscribe((...args: any[]) => {
            this.snackbar.openFromComponent(InfoComponent, {
                duration: 3000,
                verticalPosition: 'top',
                panelClass: ['white-snackbar'],
                data: args[0]
            });
        });
        store.sessionEvents('userOUT').subscribe(_ => {
            this.router.navigateByUrl('/');
        });
    }
}