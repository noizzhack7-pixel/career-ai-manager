import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import matchingData from './matching-data.json';

interface JobCandidate {
    avatar: string;
    name?: string;
    matchPercentage?: number;
    education?: string;
    experience?: number;
    department?: string;
    division?: string;
    currentRole?: string;
    tenure?: string;
    location?: string;
    availability?: string;
    salary?: string;
    skills?: { name: string; matched: boolean }[];
    additionalSkills?: string[];
    skillsMatch?: number;
    experienceMatch?: number;
    educationMatch?: number;
    cultureMatch?: number;
}

interface JobMatch {
    id: number;
    title: string;
    matchPercentage: number;
    matchDescription: string;
    category: string;
    level: string;
    department: string;
    division: string;
    candidateCount: number;
    candidates: JobCandidate[];
    description?: string;
    requirements?: string[];
    requiredSkills?: string[];
    hiringManager?: string;
    employmentPercentage?: string;
    currentEmployee?: string;
    currentEmployeeAvatar?: string;
}

@Component({
    selector: 'app-matching',
    standalone: true,
    imports: [NgFor, NgIf, FormsModule],
    templateUrl: './matching.component.html',
    styleUrl: './matching.component.css'
})
export class MatchingComponent implements OnInit {
    jobs: JobMatch[] = [];
    filteredJobs: JobMatch[] = [];
    selectedJob: JobMatch | null = null;

    // Filter state
    minMatchPercentage: number = 60;
    showNoMatch: boolean = false;
    aiRecommendationsOnly: boolean = true;
    sortBy: string = 'matchPercentage';

    // Mock candidates for job details view
    mockCandidates: JobCandidate[] = [
        {
            avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg',
            name: 'אמיר שמואלי',
            matchPercentage: 95,
            education: 'מדעי המחשב',
            experience: 7,
            department: 'מחלקת פיתוח',
            division: 'אגף טכנולוגיה',
            currentRole: 'מפתח Full Stack',
            tenure: '3 שנים',
            location: 'תל אביב',
            availability: 'מיידית',
            salary: '₪28,000',
            skills: [
                { name: 'React', matched: true },
                { name: 'Node.js', matched: true },
                { name: 'AWS', matched: true },
                { name: 'תואר ראשון', matched: true }
            ],
            additionalSkills: ['TypeScript', 'Docker', 'MongoDB', 'הובלת צוותים'],
            skillsMatch: 98,
            experienceMatch: 95,
            educationMatch: 100,
            cultureMatch: 90
        },
        {
            avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg',
            name: 'רון ברקוביץ',
            matchPercentage: 88,
            education: 'הנדסת תוכנה',
            experience: 6,
            department: 'מחלקת Backend',
            division: 'אגף טכנולוגיה',
            currentRole: 'מפתח Backend',
            tenure: '2.5 שנים',
            location: 'חיפה',
            availability: 'חודש',
            salary: '₪25,000',
            skills: [
                { name: 'Node.js', matched: true },
                { name: 'AWS', matched: true },
                { name: 'תואר ראשון', matched: true },
                { name: 'React', matched: false }
            ],
            additionalSkills: ['Python', 'PostgreSQL', 'Kubernetes'],
            skillsMatch: 85,
            experienceMatch: 92,
            educationMatch: 100,
            cultureMatch: 75
        },
        {
            avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg',
            name: 'שרה גולדברג',
            matchPercentage: 78,
            education: 'הנדסת תוכנה',
            experience: 5,
            department: 'מחלקת Frontend',
            division: 'אגף טכנולוגיה',
            currentRole: 'מפתחת Frontend',
            tenure: '2 שנים',
            location: 'ירושלים',
            availability: 'מיידית',
            salary: '₪22,000',
            skills: [
                { name: 'React', matched: true },
                { name: 'תואר ראשון', matched: true },
                { name: 'Node.js', matched: false },
                { name: 'AWS', matched: false }
            ],
            additionalSkills: ['Vue.js', 'CSS/SASS', 'Figma'],
            skillsMatch: 70,
            experienceMatch: 85,
            educationMatch: 90,
            cultureMatch: 65
        },
        {
            avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-9.jpg',
            name: 'דניאל לוי',
            matchPercentage: 74,
            education: 'מדעי המחשב',
            experience: 4,
            department: 'מחלקת פיתוח',
            division: 'אגף טכנולוגיה',
            currentRole: 'מפתח Junior',
            tenure: '1.5 שנים',
            location: 'באר שבע',
            availability: 'שבועיים',
            salary: '₪18,000',
            skills: [
                { name: 'React', matched: true },
                { name: 'תואר ראשון', matched: true },
                { name: 'Node.js', matched: false },
                { name: 'AWS', matched: false }
            ],
            additionalSkills: ['JavaScript', 'HTML/CSS', 'Git'],
            skillsMatch: 68,
            experienceMatch: 75,
            educationMatch: 95,
            cultureMatch: 60
        },
        {
            avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg',
            name: 'יוסי כהן',
            matchPercentage: 85,
            education: 'הנדסת תוכנה',
            experience: 8,
            department: 'מחלקת תשתיות',
            division: 'אגף טכנולוגיה',
            currentRole: 'ארכיטקט מערכות',
            tenure: '4 שנים',
            location: 'רמת גן',
            availability: 'מיידית',
            salary: '₪32,000',
            skills: [
                { name: 'Node.js', matched: true },
                { name: 'AWS', matched: true },
                { name: 'תואר ראשון', matched: true },
                { name: 'React', matched: false }
            ],
            additionalSkills: ['Microservices', 'Redis', 'CI/CD', 'ארכיטקטורה'],
            skillsMatch: 80,
            experienceMatch: 90,
            educationMatch: 100,
            cultureMatch: 70
        }
    ];

    // Stats
    get excellentMatchCount(): number {
        return this.jobs.filter(j => j.matchPercentage >= 80).length;
    }

    get goodMatchCount(): number {
        return this.jobs.filter(j => j.matchPercentage >= 60 && j.matchPercentage < 80).length;
    }

    get totalCandidates(): number {
        return this.jobs.reduce((sum, j) => sum + j.candidateCount, 0);
    }

    get noMatchCount(): number {
        return this.jobs.filter(j => j.matchPercentage < 60).length;
    }

    ngOnInit(): void {
        this.loadJobs();
    }

    loadJobs(): void {
        // Load data directly from imported JSON
        this.jobs = matchingData as JobMatch[];
        this.applyFilters();
    }

    applyFilters(): void {
        let result = [...this.jobs];

        // Apply minimum match percentage filter
        if (!this.showNoMatch) {
            result = result.filter(j => j.matchPercentage >= this.minMatchPercentage);
        }

        // Sort
        switch (this.sortBy) {
            case 'matchPercentage':
                result.sort((a, b) => b.matchPercentage - a.matchPercentage);
                break;
            case 'candidateCount':
                result.sort((a, b) => b.candidateCount - a.candidateCount);
                break;
            case 'category':
                result.sort((a, b) => a.category.localeCompare(b.category));
                break;
        }

        this.filteredJobs = result;
    }

    onSliderChange(value: number): void {
        this.minMatchPercentage = value;
        this.applyFilters();
    }

    resetFilters(): void {
        this.minMatchPercentage = 60;
        this.showNoMatch = false;
        this.aiRecommendationsOnly = true;
        this.applyFilters();
    }

    getMatchPercentageColor(percentage: number): string {
        if (percentage >= 80) return 'text-green-600';
        if (percentage >= 60) return 'text-amber-600';
        return 'text-orange-600';
    }

    // Job Details View
    viewJobDetails(job: JobMatch): void {
        this.selectedJob = job;
    }

    closeJobDetails(): void {
        this.selectedJob = null;
    }

    getStrokeDashoffset(percentage: number): number {
        // Calculate stroke-dashoffset for circular progress
        // circumference = 2 * PI * r = 2 * 3.14159 * 28 = 175.93
        const circumference = 175.93;
        return circumference - (percentage / 100) * circumference;
    }

    getAvailabilityColor(availability: string): string {
        if (availability === 'מיידית') return 'text-green-600';
        return 'text-yellow-600';
    }
}
