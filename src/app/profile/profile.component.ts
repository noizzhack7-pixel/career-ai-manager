import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css'
})
export class ProfileComponent {
    profile = {
        name: 'תמר כהן',
        title: 'Senior Developer',
        status: 'פעילה',
        avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg',
        email: 'tamar.cohen@company.co.il',
        phone: '03-1234567',
        location: 'תל אביב',
        department: 'Backend Development',
        experience: '5 שנים ב-3 חודשים',
        education: 'B.Sc מדעי המחשב',
        university: 'אוניברסיטת תל אביב'
    };
}
