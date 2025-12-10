import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import matchingData from './matching-data.json';

declare var Plotly: any;

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
    selected?: boolean;
    turnoverRisk?: number;
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
    imports: [NgFor, NgIf, NgClass, FormsModule],
    templateUrl: './matching.component.html',
    styleUrl: './matching.component.css'
})
export class MatchingComponent implements OnInit, AfterViewInit {
    constructor(private cdr: ChangeDetectorRef) { }

    jobs: JobMatch[] = [];
    filteredJobs: JobMatch[] = [];
    selectedJob: JobMatch | null = null;

    // Comparison view state
    showComparisonView: boolean = false;
    selectedCandidatesForComparison: JobCandidate[] = [];

    // Loading state for comparison view
    isLoadingComparison: boolean = false;
    loadingText: string = '';
    private loadingTexts: string[] = [
        'מנתח נתוני מועמדים...',
        'משווה כישורים ומיומנויות...',
        'מחשב התאמות AI...',
        'בונה דוח השוואה מפורט...',
        'מסיים עיבוד נתונים...'
    ];

    // Filter state
    minMatchPercentage: number = 60;
    showNoMatch: boolean = false;
    aiRecommendationsOnly: boolean = true;
    sortBy: string = 'matchPercentage';

    // Modal state
    showRoleMatchPopupState: boolean = false;
    showAttritionPopupState: boolean = false;
    selectedCandidateForModal: JobCandidate | null = null;

    // Filter getter
    get filteredCandidates(): JobCandidate[] {
        return this.mockCandidates.filter(c => (c.matchPercentage || 0) >= this.minMatchPercentage);
    }

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
            cultureMatch: 90,
            selected: false,
            turnoverRisk: 15
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
            cultureMatch: 75,
            selected: false,
            turnoverRisk: 39
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
            cultureMatch: 65,
            selected: false,
            turnoverRisk: 28
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
            cultureMatch: 60,
            selected: false,
            turnoverRisk: 52
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
            cultureMatch: 70,
            selected: false,
            turnoverRisk: 22
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
            case 'title':
                result.sort((a, b) => a.title.localeCompare(b.title));
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
        this.cdr.detectChanges();
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

    ngAfterViewInit(): void {
        // Charts will be rendered when comparison view is opened
    }

    // Candidate Selection for Comparison
    toggleCandidateSelection(candidate: JobCandidate): void {
        candidate.selected = !candidate.selected;
        console.log('🔄 toggleCandidateSelection:', candidate.name, 'selected:', candidate.selected);
        this.updateSelectedCandidates();
    }

    updateSelectedCandidates(): void {
        this.selectedCandidatesForComparison = this.mockCandidates.filter(c => c.selected);
        console.log('📋 updateSelectedCandidates - Selected count:', this.selectedCandidatesForComparison.length);
        console.log('📋 Selected candidates:', this.selectedCandidatesForComparison.map(c => c.name));
    }

    get selectedCandidateCount(): number {
        return this.selectedCandidatesForComparison.length;
    }

    // Comparison View
    openComparisonView(): void {
        console.log('🚀 openComparisonView called');
        console.log('📊 selectedCandidatesForComparison.length:', this.selectedCandidatesForComparison.length);
        console.log('📊 showComparisonView before:', this.showComparisonView);

        if (this.selectedCandidatesForComparison.length >= 2) {
            // Start loading animation
            this.isLoadingComparison = true;
            this.loadingText = this.loadingTexts[0];

            // Progress through loading texts
            let textIndex = 0;
            const textInterval = setInterval(() => {
                textIndex++;
                if (textIndex < this.loadingTexts.length) {
                    this.loadingText = this.loadingTexts[textIndex];
                    this.cdr.detectChanges();
                }
            }, 1000);

            // After 5 seconds, show the comparison view
            setTimeout(() => {
                clearInterval(textInterval);
                this.isLoadingComparison = false;
                this.showComparisonView = true;
                this.cdr.detectChanges();
                console.log('✅ showComparisonView set to TRUE');
                console.log('📊 selectedJob:', this.selectedJob?.title);
                // Render charts after a short delay to ensure DOM is ready
                setTimeout(() => this.renderComparisonCharts(), 100);
            }, 5000);
        } else {
            console.log('❌ NOT enough candidates selected (need >= 2)');
        }
    }

    closeComparisonView(): void {
        console.log('❌ closeComparisonView called');
        this.showComparisonView = false;
    }

    getLeadCandidate(): JobCandidate | null {
        if (this.selectedCandidatesForComparison.length === 0) return null;
        return this.selectedCandidatesForComparison.reduce((prev, curr) =>
            (curr.matchPercentage || 0) > (prev.matchPercentage || 0) ? curr : prev
        );
    }

    getSmallStrokeDashoffset(percentage: number): number {
        // For smaller circular progress (r=20, circumference = 125.66)
        const circumference = 125.66;
        return circumference - (percentage / 100) * circumference;
    }

    getMatchColor(percentage: number): string {
        if (percentage >= 90) return 'text-green-600';
        if (percentage >= 75) return 'text-primary';
        return 'text-amber-600';
    }

    renderComparisonCharts(): void {
        if (typeof Plotly === 'undefined') {
            console.warn('Plotly is not loaded');
            return;
        }

        this.selectedCandidatesForComparison.forEach((candidate, index) => {
            const chartId = `chart-candidate-${index + 1}`;
            const chartElement = document.getElementById(chartId);

            if (!chartElement) return;

            const data = [{
                type: 'bar',
                x: ['חזון', 'סוציו', 'פסיכו'],
                y: [
                    candidate.skillsMatch || 0,
                    candidate.experienceMatch || 0,
                    candidate.educationMatch || 0
                ],
                marker: {
                    color: ['#7C3AED', '#51E2C2', '#FB8F67'],
                    opacity: 1
                },
                text: [
                    `${candidate.skillsMatch || 0}%`,
                    `${candidate.experienceMatch || 0}%`,
                    `${candidate.educationMatch || 0}%`
                ],
                textposition: 'outside',
                textfont: {
                    size: 14,
                    color: '#1F2937',
                    family: 'Noto Sans Hebrew',
                    weight: 600
                },
                width: [0.6, 0.6, 0.6]
            }];

            const layout = {
                margin: { t: 60, r: 40, b: 60, l: 60 },
                paper_bgcolor: '#FFFFFF',
                plot_bgcolor: '#FFFFFF',
                title: {
                    text: `${candidate.name} - ${candidate.matchPercentage}%`,
                    font: {
                        size: 16,
                        family: 'Noto Sans Hebrew',
                        color: '#1F2937',
                        weight: 600
                    },
                    xanchor: 'center',
                    x: 0.5
                },
                xaxis: {
                    tickfont: {
                        size: 13,
                        family: 'Noto Sans Hebrew',
                        color: '#1F2937'
                    },
                    showgrid: false,
                    showline: false,
                    zeroline: false
                },
                yaxis: {
                    range: [0, 105],
                    tickfont: {
                        size: 11,
                        color: '#6B7280'
                    },
                    gridcolor: '#E5E7EB',
                    gridwidth: 1,
                    showline: false,
                    zeroline: true,
                    zerolinecolor: '#E5E7EB',
                    zerolinewidth: 2,
                    title: {
                        text: 'אחוז התאמה',
                        font: {
                            size: 12,
                            family: 'Noto Sans Hebrew',
                            color: '#6B7280'
                        },
                        standoff: 15
                    }
                },
                bargap: 0.4,
                bargroupgap: 0.1
            };

            Plotly.newPlot(chartId, data, layout, {
                responsive: true,
                displayModeBar: false,
                displaylogo: false
            });
        });
    }

    hasSkill(candidate: JobCandidate, skillName: string): boolean {
        return candidate.skills?.some(s => s.name === skillName && s.matched) || false;
    }

    // Modal functions
    openRoleMatchPopup(candidate: JobCandidate): void {
        this.selectedCandidateForModal = candidate;
        this.showRoleMatchPopupState = true;
    }

    closeRoleMatchPopup(): void {
        this.showRoleMatchPopupState = false;
        this.selectedCandidateForModal = null;
    }

    openAttritionPopup(candidate: JobCandidate): void {
        this.selectedCandidateForModal = candidate;
        this.showAttritionPopupState = true;
    }

    closeAttritionPopup(): void {
        this.showAttritionPopupState = false;
        this.selectedCandidateForModal = null;
    }
}
