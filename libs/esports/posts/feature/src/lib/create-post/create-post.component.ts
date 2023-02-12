import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LetModule, PushModule } from '@ngrx/component';
import { fromEvent, map, Observable, of, switchMap } from 'rxjs';

@Component({
  selector: 'project-assignment-create-post',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LetModule, PushModule],
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
  postForm!: FormGroup;
  errorMessage$ = of('');
  showForm = false;
  imagePreviewData$: Observable<string | ArrayBuffer | null> = of('');

  @Output() created = new EventEmitter<{ content: string; attachment?: File }>();

  @ViewChild('file') fileInput: ElementRef<HTMLInputElement> | undefined;
  @ViewChild('contentInput') contentInput: ElementRef<HTMLTextAreaElement> | undefined;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.postForm = this.fb.group({
      content: ['', [Validators.required, Validators.maxLength(256)]],
      attachment: [null],
    });

    this.errorMessage$ = this.postForm.statusChanges.pipe(
      map((status) => (status === 'INVALID' ? 'Form is invalid' : '')),
    );

    this.imagePreviewData$ = this.postForm.controls['attachment'].valueChanges.pipe(
      switchMap((file: File | null) => {
        if (!file) {
          return of(null);
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        return fromEvent(reader, 'load').pipe(map(() => reader.result));
      }),
    );
  }

  handleShowForm() {
    this.showForm = true;

    setTimeout(() => {
      this.contentInput?.nativeElement.focus();
    }, 0);
  }

  selectAttachment(files: FileList | null) {
    if (!files?.length) {
      return;
    }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) === null) {
      this.discardAttachment();
      this.postForm.controls['attachment'].setErrors({ wrongFormat: true });
      return;
    }

    this.postForm.patchValue({ attachment: files[0] }, { emitEvent: true });
  }

  resetForm() {
    this.postForm.reset();
    this.showForm = false;
  }

  submitPost() {
    if (!this.postForm.valid) {
      return;
    }

    const post = { ...this.postForm.value } as { content: string; attachment?: File };
    this.created.emit(post);
  }

  discardAttachment(): void {
    this.postForm.patchValue({ attachment: null });
    if (this.fileInput) this.fileInput.nativeElement.value = '';
  }
}
