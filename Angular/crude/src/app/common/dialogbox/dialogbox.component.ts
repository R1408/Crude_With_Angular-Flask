import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ApisService } from '../apis.service'

export interface DialogData {
  name: string;
}

@Component({
  selector: 'app-dialogbox',
  templateUrl: './dialogbox.component.html',
  styleUrls: ['./dialogbox.component.css']
})
export class DialogboxComponent implements OnInit {
  
  constructor(public dialogRef: MatDialogRef<DialogboxComponent>, private apiService: ApisService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close(this.data);
  }

  async delete(id) {
    let response = await <any> new Promise((resolve, reject) => {
      this.apiService.delete(id).subscribe((data) => resolve(data)) 
    })
    this.dialogRef.close(response);
  }


}
