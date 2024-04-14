import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent {
  constructor(
    public MatDialog:MatDialog,
    public dialog:MatDialogRef<ConfirmComponent>
  ){}

    close():void{
      this.dialog.close()
    }
    confirm():void{
      this.MatDialog.closeAll()
    }

}
