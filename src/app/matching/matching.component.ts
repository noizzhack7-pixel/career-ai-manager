import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

interface Candidate {
    id: number;
    name: string;
    avatar: string;
    matchPercentage: number;
    education: string;
    university: string;
    experience: number;
    experienceArea: string;
    location: string;
    locationDetail: string;
    status: string;
    statusDetail: string;
    description: string;
    skills: string[];
    skillsMatch: number;
    experienceMatch: number;
    educationMatch: number;
    cultureMatch: number;
    currentlyEmployed?: boolean;
    inMatching?: boolean;
}

interface Position {
    id: number;
    title: string;
    category: string;
    categoryIcon: string;
    candidateCount: number;
    isActive: boolean;
    status: string;
}

@Component({
    selector: 'app-matching',
    standalone: true,
    imports: [NgFor, NgIf],
    templateUrl: './matching.component.html',
    styleUrl: './matching.component.css'
})
export class MatchingComponent {
    showComparison = false;
    selectedCandidates: Candidate[] = [];

    currentPosition = {
        title: 'מפתח Full Stack Senior',
        category: 'טכנולוגיה',
        level: 'בכיר',
        currentEmployee: 'אמיר שמואלי',
        currentEmployeeAvatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg',
        openDate: '15/11/2024',
        description: 'פיתוח ותחזוקה של מערכות web מורכבות, עבודה עם טכנולוגיות מתקדמות כולל React, Node.js ו-AWS. הובלת פרויקטים טכנולוגיים וליווי מפתחים זוטרים.',
        requiredSkills: ['React', 'Node.js', 'AWS', 'TypeScript', 'MongoDB']
    };

    positions: Position[] = [
        { id: 1, title: 'מפתח Full Stack Senior', category: 'טכנולוגיה', categoryIcon: 'fa-microchip', candidateCount: 18, isActive: true, status: 'פעיל' },
        { id: 2, title: 'ארכיטקט תוכנה', category: 'טכנולוגיה', categoryIcon: 'fa-microchip', candidateCount: 12, isActive: false, status: 'פתוח' },
        { id: 3, title: 'מפתח DevOps', category: 'טכנולוגיה', categoryIcon: 'fa-microchip', candidateCount: 8, isActive: false, status: 'פתוח' },
        { id: 4, title: 'מהנדס QA', category: 'טכנולוגיה', categoryIcon: 'fa-microchip', candidateCount: 15, isActive: false, status: 'פתוח' },
        { id: 5, title: 'אנליסט מודיעין', category: 'מודיעין', categoryIcon: 'fa-brain', candidateCount: 22, isActive: false, status: 'פתוח' },
        { id: 6, title: 'חוקר סייבר', category: 'מודיעין', categoryIcon: 'fa-brain', candidateCount: 6, isActive: false, status: 'פתוח' },
        { id: 7, title: 'מנהל שיווק דיגיטלי', category: 'שיווק', categoryIcon: 'fa-chart-line', candidateCount: 14, isActive: false, status: 'פתוח' },
        { id: 8, title: 'כותב תוכן', category: 'שיווק', categoryIcon: 'fa-chart-line', candidateCount: 19, isActive: false, status: 'פתוח' },
        { id: 9, title: 'מנהל שרשרת אספקה', category: 'לוגיסטיקה', categoryIcon: 'fa-truck', candidateCount: 9, isActive: false, status: 'פתוח' }
    ];

    candidates: Candidate[] = [
        {
            id: 1,
            name: 'אמיר שמואלי',
            avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg',
            matchPercentage: 95,
            education: 'B.Sc מדעי המחשב',
            university: 'אוניברסיטת תל אביב',
            experience: 7,
            experienceArea: 'פיתוח Full Stack',
            location: 'תל אביב',
            locationDetail: 'מוכן לנסיעות',
            status: 'זמין מיידית',
            statusDetail: 'משרה מלאה',
            description: 'מפתח בכיר עם ניסיון נרחב ב-React, Node.js ו-AWS. עבד בחברות הייטק מובילות כולל Google Israel ו-Microsoft. ניהל צוותי פיתוח של עד 8 מפתחים והוביל פרויקטים מורכבים בהיקף של מיליוני משתמשים.',
            skills: ['React', 'Node.js', 'AWS', 'TypeScript', 'MongoDB', 'Docker', 'Kubernetes'],
            skillsMatch: 98,
            experienceMatch: 95,
            educationMatch: 100,
            cultureMatch: 90,
            currentlyEmployed: true
        },
        {
            id: 2,
            name: 'רון ברקוביץ',
            avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg',
            matchPercentage: 88,
            education: 'B.Sc הנדסת תוכנה',
            university: 'המכללה האקדמית תל אביב',
            experience: 6,
            experienceArea: 'פיתוח Backend ו-Cloud',
            location: 'רמת גן',
            locationDetail: 'עבודה היברידית',
            status: 'זמין בחודש',
            statusDetail: 'משרה מלאה',
            description: 'מומחה בתשתיות ענן ופיתוח Backend. ניסיון רב ב-AWS, Node.js ו-Python. עבד בחברות פינטק ובנקאות דיגיטלית. מתמחה בבניית מערכות מבוזרות וסקיילביליות גבוהה.',
            skills: ['Node.js', 'AWS', 'Python', 'PostgreSQL', 'Redis', 'Microservices'],
            skillsMatch: 85,
            experienceMatch: 90,
            educationMatch: 95,
            cultureMatch: 85,
            inMatching: true
        },
        {
            id: 3,
            name: 'שרה גולדברג',
            avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg',
            matchPercentage: 78,
            education: 'B.Sc הנדסת תוכנה',
            university: 'טכניון',
            experience: 5,
            experienceArea: 'פיתוח Frontend',
            location: 'חיפה',
            locationDetail: 'עבודה מהבית',
            status: 'זמינה בשבועיים',
            statusDetail: 'משרה מלאה',
            description: 'מפתחת Frontend מנוסה עם התמחות ב-React ו-Vue.js. ניסיון בבניית ממשקי משתמש מורכבים ומתקדמים. עבדה בסטארט-אפים וחברות גדולות. מתמחה ב-UX ונגישות.',
            skills: ['React', 'Vue.js', 'JavaScript', 'CSS/SCSS', 'Webpack'],
            skillsMatch: 75,
            experienceMatch: 70,
            educationMatch: 100,
            cultureMatch: 80
        },
        {
            id: 4,
            name: 'משה דהן',
            avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg',
            matchPercentage: 72,
            education: 'B.A מדעי המחשב',
            university: 'האוניברסיטה הפתוחה',
            experience: 4,
            experienceArea: 'פיתוח Full Stack',
            location: 'באר שבע',
            locationDetail: 'מוכן למעבר',
            status: 'זמין מיידית',
            statusDetail: 'משרה מלאה',
            description: 'מפתח Full Stack עם ניסיון ב-React ו-Node.js. עבד בחברות בינוניות וסטארט-אפים בשלב מוקדם. מעוניין להתפתח ולהתקדם בתחום הענן והמיקרו-סרוויסים.',
            skills: ['React', 'Node.js', 'Express', 'MongoDB', 'Git'],
            skillsMatch: 70,
            experienceMatch: 65,
            educationMatch: 85,
            cultureMatch: 75
        },
        {
            id: 5,
            name: 'עומר פרץ',
            avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-9.jpg',
            matchPercentage: 65,
            education: 'הנדסאי תוכנה',
            university: 'מכון טכנולוגי חולון',
            experience: 3,
            experienceArea: 'פיתוח Backend',
            location: 'ירושלים',
            locationDetail: 'עבודה מהבית',
            status: 'זמין בחודש',
            statusDetail: 'משרה מלאה',
            description: 'מפתח Backend צעיר עם ניסיון ב-Node.js ו-Python. עבד בחברות קטנות ומתחיל להתמחות בטכנולוגיות ענן. מעוניין ללמוד ולהתפתח בתחום ה-Full Stack.',
            skills: ['Node.js', 'Python', 'MongoDB', 'Express'],
            skillsMatch: 60,
            experienceMatch: 55,
            educationMatch: 70,
            cultureMatch: 75
        }
    ];

    getMatchColor(percentage: number): string {
        if (percentage >= 90) return 'from-green-500 to-green-600';
        if (percentage >= 80) return 'from-green-400 to-green-500';
        if (percentage >= 70) return 'from-yellow-400 to-yellow-500';
        return 'from-orange-400 to-orange-500';
    }

    getMatchTextColor(percentage: number): string {
        if (percentage >= 90) return 'text-green-600';
        if (percentage >= 80) return 'text-green-500';
        if (percentage >= 70) return 'text-yellow-600';
        return 'text-orange-600';
    }

    getStatusBadgeClass(candidate: Candidate): string {
        if (candidate.currentlyEmployed) return 'bg-green-100 text-green-700';
        if (candidate.inMatching) return 'bg-yellow-100 text-yellow-700';
        return '';
    }

    getStatusText(candidate: Candidate): string {
        if (candidate.currentlyEmployed) return 'מאויש כרגע';
        if (candidate.inMatching) return 'בהתאמה';
        return '';
    }

    toggleComparison() {
        this.showComparison = !this.showComparison;
        if (this.showComparison && this.selectedCandidates.length === 0) {
            // Initialize with top 3 candidates
            this.selectedCandidates = this.candidates.slice(0, 3);
        }
    }

    isSelected(candidate: Candidate): boolean {
        return this.selectedCandidates.some(c => c.id === candidate.id);
    }
}
