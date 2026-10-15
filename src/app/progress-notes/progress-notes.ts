import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule, CommonModule],
  selector: 'app-progress-notes',
  styleUrl: './progress-notes.css',
  templateUrl: './progress-notes.html',
})
export class ProgressNotes {
  progressNotesForm = new FormGroup({
    projectCode: new FormControl(''),
    projectName: new FormControl(''),
    date: new FormControl(''),
    currentStatus: new FormControl(''),
    teamMember: new FormControl(''),
    progressNote: new FormControl(''),
  });

  projectCodeNotFound = false;

  projectCodeMap: { [code: string]: string } = {
    PPT101: 'Project Progress Tracker',
    WEB202: 'Website Redesign',
    APP303: 'Mobile Application Development',
    DATA404: 'Data Analytics Dashboard',
  };

  findProjectName(code: string): string | undefined {
    return this.projectCodeMap[code];
  }

  onProjectCodeBlur() {
    const code = (this.progressNotesForm.controls.projectCode.value ?? '').trim().toUpperCase();
    const projectNameControl = this.progressNotesForm.controls.projectName;

    if (code === '') {
      this.projectCodeNotFound = false;
      return;
    }

    const projectName = this.findProjectName(code);

    if (projectName) {
      projectNameControl.setValue(projectName);
      this.projectCodeNotFound = false;
    } else {
      projectNameControl.setValue('');
      this.projectCodeNotFound = true;
    }
  }
}
