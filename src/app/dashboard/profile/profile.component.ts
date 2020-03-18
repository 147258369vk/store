import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  resultData:any=[];
  id:string;
  @ViewChild('labelImport',{static:true})
  labelImport: ElementRef;

  formImport: FormGroup;
  fileToUpload: File = null;

  constructor(public userService:UserService) {
    this.formImport = new FormGroup({
      importFile: new FormControl('', Validators.required)
    });
  }

  onFileChange(files: FileList) {
    this.labelImport.nativeElement.innerText = Array.from(files)
      .map(f => f.name)
      .join(', ');
    this.fileToUpload = files.item(0);
  }

  import(): void {
    console.log('import ' + this.fileToUpload.name);
  }

  ngOnInit() {
    this.id=sessionStorage.getItem('userid');

    console.log(this.id);
    this.userService.getuserInfo(this.id).subscribe((res)=>{
      this.resultData=res;
      console.log(this.resultData);
      this.resultData.User.password='';
     
      
    })

  }

  

}
