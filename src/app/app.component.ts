import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ActivityCalendarComponent, Activity } from './components/activity-calendar/activity-calendar.component';

interface SelectOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ActivityCalendarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'custom-components-library';

  // For TextInputComponent
  textInputValue: string = '';

  // For SelectInputComponent
  selectedOption: string = '';
  selectOptions: SelectOption[] = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    { value: 'another', label: 'Another Option' },
    { value: 'test', label: 'Test Option' }
  ];

  activities: Activity[] = [
    { title: 'Call John', start_date: new Date(2025, 6, 10), activity_type: 'call' },
    { title: 'Visit Mary', start_date: new Date(2025, 6, 15), activity_type: 'visit' },
    { title: 'Email Team', start_date: new Date(2025, 6, 20), activity_type: 'e-mail' },
    { title: 'Follow up', start_date: new Date(2025, 6, 10), activity_type: 'e-mail' },
  ];

  onTextInputChange(value: string): void {
    this.textInputValue = value;
    console.log('Text Input Value:', this.textInputValue);
  }

  onSelectInputChange(value: string): void {
    this.selectedOption = value;
    console.log('Select Input Value:', this.selectedOption);
  }
}
