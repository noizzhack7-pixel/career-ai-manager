import { Component, HostListener, ElementRef } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [RouterLink, RouterLinkActive, NgIf, NgFor],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent {
    showUserPopover = false;
    showNotifications = false;

    notifications = [
        { id: 1, title: 'מועמד חדש התאים לתפקיד', message: 'אמיר שמואלי - התאמה של 95% לתפקיד מפתח Full Stack', time: 'לפני 5 דקות', type: 'success', icon: 'fa-user-check' },
        { id: 2, title: 'תפקיד אויש בהצלחה', message: 'תפקיד מנהל פיתוח אויש על ידי דנה לוי', time: 'לפני שעה', type: 'info', icon: 'fa-check-circle' },
        { id: 3, title: 'פער קריטי במיומנויות', message: 'דרושים 6 מומחי Cybersecurity באופן מיידי', time: 'לפני 2 שעות', type: 'warning', icon: 'fa-exclamation-triangle' },
        { id: 4, title: 'דוח שבועי מוכן', message: 'דוח ניתוח משאבי אנוש לשבוע 08/12/2024 זמין לצפייה', time: 'לפני 3 שעות', type: 'info', icon: 'fa-file-alt' },
        { id: 5, title: '23 מועמדים חדשים', message: 'מועמדים חדשים למחלקת טכנולוגיה ממתינים לסקירה', time: 'היום', type: 'info', icon: 'fa-users' }
    ];

    unreadCount = 3;

    constructor(private elementRef: ElementRef) { }

    @HostListener('document:click', ['$event'])
    onDocumentClick(event: MouseEvent) {
        // Check if the click is outside the header component
        if (!this.elementRef.nativeElement.contains(event.target)) {
            this.closePopovers();
        }
    }

    toggleUserPopover() {
        this.showUserPopover = !this.showUserPopover;
        if (this.showUserPopover) {
            this.showNotifications = false;
        }
    }

    toggleNotifications() {
        this.showNotifications = !this.showNotifications;
        if (this.showNotifications) {
            this.showUserPopover = false;
        }
    }

    closePopovers() {
        this.showUserPopover = false;
        this.showNotifications = false;
    }

    getNotificationIcon(type: string): string {
        switch (type) {
            case 'success': return 'text-green-600';
            case 'warning': return 'text-orange-600';
            case 'error': return 'text-red-600';
            default: return 'text-blue-600';
        }
    }

    logout() {
        console.log('Logging out...');
        this.closePopovers();
    }
}
