import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Role {
    id: number;
    title: string;
    category: string;
    status: 'filled' | 'open' | 'recruiting' | 'frozen';
    level: string;
    assignedTo?: string;
    candidateCount: number;
    department?: string;
    salaryRange?: string;
    createdDate?: Date;
}

@Component({
    selector: 'app-roles',
    standalone: true,
    imports: [NgFor, NgIf, FormsModule],
    templateUrl: './roles.component.html',
    styleUrl: './roles.component.css'
})
export class RolesComponent {
    // Filter properties
    searchTerm: string = '';
    selectedCategory: string = '';
    selectedStatus: string = '';
    selectedLevel: string = '';
    showAdvancedFilter: boolean = false;

    // Advanced filter properties
    advancedFilters = {
        department: '',
        minSalary: '',
        maxSalary: '',
        dateFrom: '',
        dateTo: '',
        minCandidates: '',
        maxCandidates: '',
        onlyUnassigned: false
    };

    roles: Role[] = [
        // Technology
        { id: 1, title: 'מפתח Full Stack Senior', category: 'טכנולוגיה', status: 'filled', level: 'בכיר', assignedTo: 'אמיר שמואלי', candidateCount: 18, department: 'פיתוח', salaryRange: '25000-35000', createdDate: new Date('2024-01-15') },
        { id: 2, title: 'ארכיטקט תוכנה', category: 'טכנולוגיה', status: 'open', level: 'בכיר', candidateCount: 12, department: 'פיתוח', salaryRange: '30000-40000', createdDate: new Date('2024-02-20') },
        { id: 3, title: 'מפתח DevOps', category: 'טכנולוגיה', status: 'open', level: 'בינוני', candidateCount: 8, department: 'תשתיות', salaryRange: '18000-25000', createdDate: new Date('2024-03-10') },
        { id: 4, title: 'מהנדס QA', category: 'טכנולוגיה', status: 'filled', level: 'בינוני', assignedTo: 'שרה גולדברג', candidateCount: 15, department: 'איכות', salaryRange: '16000-22000', createdDate: new Date('2024-01-05') },
        { id: 5, title: 'מפתח Frontend', category: 'טכנולוגיה', status: 'filled', level: 'בינוני', assignedTo: 'רון ברקוביץ', candidateCount: 10, department: 'פיתוח', salaryRange: '17000-24000', createdDate: new Date('2024-02-01') },
        { id: 6, title: 'מנהל פרויקטים טכנולוגיים', category: 'טכנולוגיה', status: 'recruiting', level: 'ניהולי', candidateCount: 7, department: 'ניהול', salaryRange: '28000-38000', createdDate: new Date('2024-04-01') },

        // Intelligence
        { id: 7, title: 'אנליסט מודיעין', category: 'מודיעין', status: 'open', level: 'בכיר', candidateCount: 22, department: 'מודיעין', salaryRange: '22000-30000', createdDate: new Date('2024-03-15') },
        { id: 8, title: 'חוקר סייבר', category: 'מודיעין', status: 'filled', level: 'בכיר', assignedTo: 'משה דהן', candidateCount: 6, department: 'סייבר', salaryRange: '26000-35000', createdDate: new Date('2024-01-20') },
        { id: 9, title: 'מנהל צוות מודיעין', category: 'מודיעין', status: 'filled', level: 'ניהולי', assignedTo: 'עומר פרץ', candidateCount: 4, department: 'מודיעין', salaryRange: '30000-42000', createdDate: new Date('2024-02-10') },

        // Marketing
        { id: 10, title: 'מנהל שיווק דיגיטלי', category: 'שיווק', status: 'open', level: 'בכיר', candidateCount: 14, department: 'שיווק', salaryRange: '20000-28000', createdDate: new Date('2024-03-25') },
        { id: 11, title: 'כותב תוכן', category: 'שיווק', status: 'filled', level: 'בינוני', assignedTo: 'דנה לוי', candidateCount: 19, department: 'תוכן', salaryRange: '12000-18000', createdDate: new Date('2024-01-30') },
        { id: 12, title: 'מנהל רשתות חברתיות', category: 'שיווק', status: 'filled', level: 'זוטר', assignedTo: 'נועה כהן', candidateCount: 11, department: 'שיווק', salaryRange: '10000-15000', createdDate: new Date('2024-02-15') },

        // Logistics
        { id: 13, title: 'מנהל שרשרת אספקה', category: 'לוגיסטיקה', status: 'open', level: 'ניהולי', candidateCount: 9, department: 'לוגיסטיקה', salaryRange: '25000-35000', createdDate: new Date('2024-04-05') },
        { id: 14, title: 'רכז לוגיסטיקה', category: 'לוגיסטיקה', status: 'filled', level: 'בינוני', assignedTo: 'יוסי אברהם', candidateCount: 13, department: 'לוגיסטיקה', salaryRange: '14000-20000', createdDate: new Date('2024-02-20') },
        { id: 15, title: 'אחראי מחסן', category: 'לוגיסטיקה', status: 'filled', level: 'זוטר', assignedTo: 'מיכאל שלום', candidateCount: 16, department: 'מחסן', salaryRange: '9000-13000', createdDate: new Date('2024-01-10') },

        // Administration
        { id: 16, title: 'מנהל משאבי אנוש', category: 'אדמיניסטרציה', status: 'filled', level: 'ניהולי', assignedTo: 'רחל כהן', candidateCount: 5, department: 'משאבי אנוש', salaryRange: '28000-38000', createdDate: new Date('2024-01-01') },
        { id: 17, title: 'רכז גיוס', category: 'אדמיניסטרציה', status: 'open', level: 'בינוני', candidateCount: 17, department: 'משאבי אנוש', salaryRange: '15000-22000', createdDate: new Date('2024-03-20') },
        { id: 18, title: 'מזכירה ראשית', category: 'אדמיניסטרציה', status: 'filled', level: 'בכיר', assignedTo: 'תמר לוי', candidateCount: 8, department: 'מנהלה', salaryRange: '18000-25000', createdDate: new Date('2024-02-05') },

        // Operations
        { id: 19, title: 'מפקד צוות', category: 'מבצעי', status: 'filled', level: 'בכיר', assignedTo: 'אבי מזרחי', candidateCount: 11, department: 'מבצעים', salaryRange: '24000-32000', createdDate: new Date('2024-01-25') },
        { id: 20, title: 'קצין תורן', category: 'מבצעי', status: 'open', level: 'בינוני', candidateCount: 24, department: 'מבצעים', salaryRange: '16000-23000', createdDate: new Date('2024-04-10') },
        { id: 21, title: 'מפקד מבצעים', category: 'מבצעי', status: 'filled', level: 'ניהולי', assignedTo: 'דוד שפירא', candidateCount: 7, department: 'מבצעים', salaryRange: '30000-40000', createdDate: new Date('2024-02-28') }
    ];

    getStatusLabel(status: string): string {
        const labels: { [key: string]: string } = {
            'filled': 'מאויש',
            'open': 'פתוח',
            'recruiting': 'בתהליך',
            'frozen': 'מוקפא'
        };
        return labels[status] || status;
    }

    getStatusClass(status: string): string {
        const classes: { [key: string]: string } = {
            'filled': 'bg-green-100 text-green-700',
            'open': 'bg-yellow-100 text-yellow-700',
            'recruiting': 'bg-blue-100 text-blue-700',
            'frozen': 'bg-gray-100 text-gray-700'
        };
        return classes[status] || '';
    }

    getCategoryIcon(category: string): string {
        const icons: { [key: string]: string } = {
            'טכנולוגיה': 'fa-microchip',
            'מודיעין': 'fa-brain',
            'שיווק': 'fa-chart-line',
            'לוגיסטיקה': 'fa-truck',
            'אדמיניסטרציה': 'fa-file-contract',
            'מבצעי': 'fa-shield-halved'
        };
        return icons[category] || 'fa-briefcase';
    }

    getCategoryGradient(category: string): string {
        const gradients: { [key: string]: string } = {
            'טכנולוגיה': 'bg-gradient-to-r from-primary to-primaryLight',
            'מודיעין': 'bg-gradient-to-r from-primaryLight to-purpleGradient',
            'שיווק': 'bg-gradient-to-r from-secondary to-pink-400',
            'לוגיסטיקה': 'bg-gradient-to-r from-accent to-teal-400',
            'אדמיניסטרציה': 'bg-gradient-to-r from-purple-600 to-purple-700',
            'מבצעי': 'bg-gradient-to-r from-red-600 to-red-700'
        };
        return gradients[category] || 'bg-gradient-to-r from-primary to-primaryLight';
    }

    // Filter methods
    get filteredRoles(): Role[] {
        return this.roles.filter(role => {
            // Search filter
            const matchesSearch = !this.searchTerm ||
                role.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                (role.assignedTo && role.assignedTo.toLowerCase().includes(this.searchTerm.toLowerCase()));

            // Category filter
            const matchesCategory = !this.selectedCategory || role.category === this.selectedCategory;

            // Status filter
            const matchesStatus = !this.selectedStatus || role.status === this.selectedStatus;

            // Level filter
            const matchesLevel = !this.selectedLevel || role.level === this.selectedLevel;

            // Advanced filters
            const matchesDepartment = !this.advancedFilters.department ||
                (role.department && role.department.includes(this.advancedFilters.department));

            const matchesUnassigned = !this.advancedFilters.onlyUnassigned || !role.assignedTo;

            const matchesCandidateRange =
                (!this.advancedFilters.minCandidates || role.candidateCount >= parseInt(this.advancedFilters.minCandidates)) &&
                (!this.advancedFilters.maxCandidates || role.candidateCount <= parseInt(this.advancedFilters.maxCandidates));

            return matchesSearch && matchesCategory && matchesStatus && matchesLevel &&
                matchesDepartment && matchesUnassigned && matchesCandidateRange;
        });
    }

    getRolesByCategory(category: string): Role[] {
        return this.filteredRoles.filter(role => role.category === category);
    }

    getCategoryStats(category: string) {
        const categoryRoles = this.getRolesByCategory(category);
        const total = categoryRoles.length;
        const filled = categoryRoles.filter(r => r.status === 'filled').length;
        const open = categoryRoles.filter(r => r.status === 'open').length;
        return { total, filled, open };
    }

    get visibleCategories() {
        return this.categories.filter(cat => this.getRolesByCategory(cat.name).length > 0);
    }

    categories = [
        { name: 'טכנולוגיה', icon: 'fa-microchip' },
        { name: 'מודיעין', icon: 'fa-brain' },
        { name: 'שיווק', icon: 'fa-chart-line' },
        { name: 'לוגיסטיקה', icon: 'fa-truck' },
        { name: 'אדמיניסטרציה', icon: 'fa-file-contract' },
        { name: 'מבצעי', icon: 'fa-shield-halved' }
    ];

    toggleAdvancedFilter() {
        this.showAdvancedFilter = !this.showAdvancedFilter;
    }

    resetFilters() {
        this.searchTerm = '';
        this.selectedCategory = '';
        this.selectedStatus = '';
        this.selectedLevel = '';
        this.advancedFilters = {
            department: '',
            minSalary: '',
            maxSalary: '',
            dateFrom: '',
            dateTo: '',
            minCandidates: '',
            maxCandidates: '',
            onlyUnassigned: false
        };
    }

    applyAdvancedFilters() {
        this.showAdvancedFilter = false;
    }

    get activeFiltersCount(): number {
        let count = 0;
        if (this.searchTerm) count++;
        if (this.selectedCategory) count++;
        if (this.selectedStatus) count++;
        if (this.selectedLevel) count++;
        if (this.advancedFilters.department) count++;
        if (this.advancedFilters.minSalary) count++;
        if (this.advancedFilters.maxSalary) count++;
        if (this.advancedFilters.minCandidates) count++;
        if (this.advancedFilters.maxCandidates) count++;
        if (this.advancedFilters.onlyUnassigned) count++;
        return count;
    }
}
