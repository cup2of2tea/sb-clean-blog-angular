import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { BlogService } from '@modules/blog/services';

@Component({
    selector: 'sb-new-post',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './new-post.component.html',
    styleUrls: ['new-post.component.scss'],
})
export class NewPostComponent implements OnInit {
    newPostForm = this.fb.group({
        heading: ['', [Validators.required]],
        subHeading: ['', [Validators.required]],
        backgroundImage: ['', [Validators.required]],
        body: ['', [Validators.required]],
    });

    // Random unsplash https://source.unsplash.com/1900x1200/

    constructor(private fb: FormBuilder, private blogService: BlogService) {}
    ngOnInit() {}

    onSubmit() {
        if (this.newPostForm.status === 'VALID') {
            this.blogService
                .createPost$(this.newPostForm.value)
                .subscribe(response => console.log(response));
        }

        for (const key in this.newPostForm.controls) {
            if (this.newPostForm.controls.hasOwnProperty(key)) {
                const control = this.newPostForm.controls[key];
                control.markAllAsTouched();
            }
        }
    }

    /* Accessor Methods */

    // heading
    get headingControl() {
        return this.newPostForm.get('heading') as FormControl;
    }

    get headingControlValid() {
        return this.headingControl.touched && !this.headingControlInvalid;
    }

    get headingControlInvalid() {
        return (
            this.headingControl.touched &&
            (this.headingControl.hasError('required') || this.headingControl.hasError('heading'))
        );
    }

    // subHeading
    get subHeadingControl() {
        return this.newPostForm.get('subHeading') as FormControl;
    }

    get subHeadingControlValid() {
        return this.subHeadingControl.touched && !this.subHeadingControlInvalid;
    }

    get subHeadingControlInvalid() {
        return (
            this.subHeadingControl.touched &&
            (this.subHeadingControl.hasError('required') ||
                this.subHeadingControl.hasError('subHeading'))
        );
    }

    // backgroundImage
    get backgroundImageControl() {
        return this.newPostForm.get('backgroundImage') as FormControl;
    }

    get backgroundImageControlValid() {
        return this.backgroundImageControl.touched && !this.backgroundImageControlInvalid;
    }

    get backgroundImageControlInvalid() {
        return (
            this.backgroundImageControl.touched &&
            (this.backgroundImageControl.hasError('required') ||
                this.backgroundImageControl.hasError('backgroundImage'))
        );
    }

    // body
    get bodyControl() {
        return this.newPostForm.get('body') as FormControl;
    }

    get bodyControlValid() {
        return this.bodyControl.touched && !this.bodyControlInvalid;
    }

    get bodyControlInvalid() {
        return (
            this.bodyControl.touched &&
            (this.bodyControl.hasError('required') || this.bodyControl.hasError('body'))
        );
    }
}
