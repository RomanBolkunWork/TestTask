import { AfterViewInit, Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

const noop = () => { };

@Component({
    selector: 'app-file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: FileUploadComponent,
            multi: true
        }
    ]
})
export class FileUploadComponent implements OnInit, OnDestroy, AfterViewInit {

    constructor() { }

    get value(): any {
        return this.file;
    }

    set value(v: any) {
        if (v != this.file) {
            this.file = v;
            this.onChangeCallback(v);
        }
    }

    @Input() accept: string;

    private onTouchedCallback: any = noop;
    private onChangeCallback: (_: any) => void = noop;

    file: File | null;
    onChange: any;

    @HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {
        const file = event && event.item(0);
        this.onChange(file);
        this.file = file;
    }

    ngOnInit(): void { }

    ngAfterViewInit(): void { }

    writeValue(value: any): void {
        if (value != this.file) {
            this.file = value;
        }
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    removeFile(): void {
        (document.getElementById('fileInput') as HTMLInputElement).value = null;
        this.file = null;
        this.onChange(null);
    }

    registerOnTouched(fn: any): void { }

    ngOnDestroy(): void { }
}
