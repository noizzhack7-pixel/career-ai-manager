import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface NotificationSetting {
    id: string;
    label: string;
    description: string;
    enabled: boolean;
}

interface User {
    name: string;
    email: string;
    role: string;
    department: string;
    phone: string;
    avatar: string;
}

@Component({
    selector: 'app-settings',
    standalone: true,
    imports: [NgFor, NgIf, FormsModule],
    templateUrl: './settings.component.html',
    styleUrl: './settings.component.css'
})
export class SettingsComponent {
    activeTab: string = 'profile';

    user: User = {
        name: 'רחל כהן',
        email: 'rachel.cohen@company.com',
        role: 'מנהלת משאבי אנוש',
        department: 'משאבי אנוש',
        phone: '050-1234567',
        avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg'
    };

    notificationSettings: NotificationSetting[] = [
        {
            id: 'new-candidate',
            label: 'מועמד חדש התאים לתפקיד',
            description: 'קבל התראה כאשר מועמד חדש נמצא מתאים לאחד התפקידים הפתוחים',
            enabled: true
        },
        {
            id: 'employee-risk',
            label: 'עובד בסיכון גבוה לעזיבה',
            description: 'קבל התראה כאשר עובד מסווג כבעל סיכון גבוה לעזיבה',
            enabled: true
        },
        {
            id: 'role-filled',
            label: 'תפקיד אויש',
            description: 'קבל התראה כאשר תפקיד פתוח אויש בהצלחה',
            enabled: true
        },
        {
            id: 'new-role',
            label: 'תפקיד חדש נוסף',
            description: 'קבל התראה כאשר תפקיד חדש נוסף למערכת',
            enabled: false
        },
        {
            id: 'weekly-report',
            label: 'דוח שבועי',
            description: 'קבל דוח שבועי מסכם על פעילות המערכת',
            enabled: true
        },
        {
            id: 'system-updates',
            label: 'עדכוני מערכת',
            description: 'קבל התראות על עדכונים ושיפורים במערכת',
            enabled: false
        }
    ];

    systemSettings = {
        language: 'he',
        theme: 'light',
        dateFormat: 'DD/MM/YYYY',
        timeZone: 'Asia/Jerusalem',
        itemsPerPage: 10
    };

    securitySettings = {
        twoFactorAuth: false,
        sessionTimeout: 30,
        passwordExpiry: 90
    };

    setActiveTab(tab: string) {
        this.activeTab = tab;
    }

    toggleNotification(id: string) {
        const setting = this.notificationSettings.find(s => s.id === id);
        if (setting) {
            setting.enabled = !setting.enabled;
        }
    }

    saveProfile() {
        console.log('Saving profile...', this.user);
        // Add save logic here
    }

    saveNotifications() {
        console.log('Saving notifications...', this.notificationSettings);
        // Add save logic here
    }

    saveSystemSettings() {
        console.log('Saving system settings...', this.systemSettings);
        // Add save logic here
    }

    saveSecurity() {
        console.log('Saving security settings...', this.securitySettings);
        // Add save logic here
    }

    changePassword() {
        console.log('Opening change password dialog...');
        // Add password change logic here
    }

    exportData() {
        console.log('Exporting data...');
        // Add export logic here
    }

    deleteAccount() {
        console.log('Opening delete account confirmation...');
        // Add delete account logic here
    }
}
