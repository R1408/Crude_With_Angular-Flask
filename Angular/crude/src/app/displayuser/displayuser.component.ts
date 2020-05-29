import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogboxComponent } from '../common/dialogbox/dialogbox.component'
import { ApisService } from '../common/apis.service';

@Component({
  selector: 'app-displayuser',
  templateUrl: './displayuser.component.html',
  styleUrls: ['./displayuser.component.css']
})
export class DisplayuserComponent implements OnInit {
  
  displayedColumns: string[] = ['id', 'first_name', 'last_name', 'email', 'password', 'edit', 'delete'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public dialog: MatDialog, private apis: ApisService) { }

  users: any;

  ngOnInit(): void {
    this.getUsers()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteUser(name, id): void {
    const dialogRef = this.dialog.open(DialogboxComponent, {
      width: '250px',
      data: {name: name, id: id}
    });

    dialogRef.afterClosed().subscribe(result => {
       this.getUsers()
    });
  }

  async getUsers() {
     let response= await <any> new Promise((resolve, reject) => {
         this.apis.getAll().subscribe((data) => resolve(data))
     })
     let responseObj = JSON.parse(response)
     const users = responseObj.data
    // // Assign the data to the data source for the table to render
     this.dataSource = new MatTableDataSource(users);
     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;
  }


}
