import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import {PostService} from '../services/post.service';
import {FormControl, Validators} from '@angular/forms'
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';


@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }


  constructor(private service:PostService) { }

  onAddPost(form: NgForm) {

    this.service.addPost(form.value.title, form.value.name, form.value.number, form.value.password, form.value.email).subscribe();
    // When adding put it in post-create.component.ts, post.model.ts, post.service.ts and server.js/app.post
    console.log(form.value);
    form.resetForm();
  }
  


  ngOnInit() {



  }

}
