import { Component, AfterViewInit, Inject, PLATFORM_ID, signal, computed, OnInit } from '@angular/core';
import { isPlatformBrowser, NgFor, NgIf } from '@angular/common';
import employeeData from './employees-data.json';

declare var Plotly: any;

interface Employee {
    id: number;
    name: string;
    role: string;
    department: string;
    tenure: number;
    turnoverRisk: number;
    avatar: string;
    status?: string;
    organizationalUnit?: string;
    subUnit?: string;
}

type SortOption = 'name-asc' | 'name-desc' | 'role' | 'tenure' | 'risk';

@Component({
    selector: 'app-employees',
    standalone: true,
    imports: [NgFor, NgIf],
    templateUrl: './employees.component.html',
    styleUrl: './employees.component.css'
})
export class EmployeesComponent implements OnInit, AfterViewInit {
    private employees = signal<Employee[]>([]);

    sortOption = signal<SortOption>('name-asc');
    showRoleMatchPopup = signal<boolean>(false);
    showAttritionPopup = signal<boolean>(false);
    selectedEmployee = signal<Employee | null>(null);
    searchQuery = signal<string>('');

    // Pagination
    currentPage = signal<number>(1);
    itemsPerPage = 8;

    // Filtered employees based on search
    filteredEmployees = computed(() => {
        const query = this.searchQuery().toLowerCase().trim();
        if (!query) {
            return this.employees();
        }

        return this.employees().filter(emp => {
            return emp.name.toLowerCase().includes(query) ||
                emp.role.toLowerCase().includes(query) ||
                emp.department.toLowerCase().includes(query) ||
                (emp.organizationalUnit && emp.organizationalUnit.toLowerCase().includes(query)) ||
                (emp.subUnit && emp.subUnit.toLowerCase().includes(query)) ||
                (emp.status && emp.status.toLowerCase().includes(query));
        });
    });

    totalPages = computed(() => Math.ceil(this.sortedEmployees().length / this.itemsPerPage));

    paginatedEmployees = computed(() => {
        const sorted = this.sortedEmployees();
        const start = (this.currentPage() - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return sorted.slice(start, end);
    });

    sortedEmployees = computed(() => {
        const emps = [...this.filteredEmployees()];
        const option = this.sortOption();

        switch (option) {
            case 'name-asc':
                return emps.sort((a, b) => {
                    return a.name.localeCompare(b.name, 'he-IL', { sensitivity: 'base' });
                });
            case 'name-desc':
                return emps.sort((a, b) => {
                    return b.name.localeCompare(a.name, 'he-IL', { sensitivity: 'base' });
                });
            case 'role':
                return emps.sort((a, b) => {
                    return a.role.localeCompare(b.role, 'he-IL', { sensitivity: 'base' });
                });
            case 'tenure':
                return emps.sort((a, b) => b.tenure - a.tenure);
            case 'risk':
                return emps.sort((a, b) => b.turnoverRisk - a.turnoverRisk);
            default:
                return emps;
        }
    });

    constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

    ngOnInit() {
        // Load employee data from imported JSON
        if (employeeData && employeeData.employees) {
            this.employees.set(employeeData.employees as Employee[]);
            console.log('Loaded employees from JSON:', employeeData.employees.length);
        }
    }

    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.initCharts();
        }
    }

    onSortChange(event: Event) {
        const select = event.target as HTMLSelectElement;
        this.sortOption.set(select.value as SortOption);
        this.currentPage.set(1); // Reset to first page on sort
    }

    goToPage(page: number) {
        if (page >= 1 && page <= this.totalPages()) {
            this.currentPage.set(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    nextPage() {
        if (this.currentPage() < this.totalPages()) {
            this.currentPage.set(this.currentPage() + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    previousPage() {
        if (this.currentPage() > 1) {
            this.currentPage.set(this.currentPage() - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    onSearchChange(event: Event) {
        const input = event.target as HTMLInputElement;
        this.searchQuery.set(input.value);
        this.currentPage.set(1); // Reset to first page on search
    }

    clearSearch() {
        this.searchQuery.set('');
        this.currentPage.set(1);
    }

    openRoleMatchPopup(employee: Employee) {
        this.selectedEmployee.set(employee);
        this.showRoleMatchPopup.set(true);
    }

    closeRoleMatchPopup() {
        this.showRoleMatchPopup.set(false);
        this.selectedEmployee.set(null);
    }

    openAttritionPopup(employee: Employee) {
        this.selectedEmployee.set(employee);
        this.showAttritionPopup.set(true);
    }

    closeAttritionPopup() {
        this.showAttritionPopup.set(false);
        this.selectedEmployee.set(null);
    }



    private initCharts() {
        const config = { responsive: true, displayModeBar: false, displaylogo: false };

        // Chart 1
        try {
            const data1 = [{
                type: 'scatterpolar',
                r: [95, 92, 88, 90, 85, 80, 75, 70],
                theta: ['React', 'Node.js', 'AWS', 'TypeScript', 'MongoDB', 'Docker', 'Kubernetes', 'Python'],
                fill: 'toself',
                marker: {
                    color: '#650F54'
                }
            }];

            const layout1 = {
                title: { text: 'רמת כישורים', font: { size: 16 } },
                polar: {
                    radialaxis: {
                        visible: true,
                        range: [0, 100]
                    }
                },
                margin: { t: 60, r: 20, b: 80, l: 60 },
                plot_bgcolor: '#ffffff',
                paper_bgcolor: '#ffffff',
                showlegend: false
            };

            Plotly.newPlot('skills-chart-1', data1, layout1, config);
        } catch (e) {
            console.error('Error loading chart 1', e);
            const el = document.getElementById('skills-chart-1');
            if (el) el.innerHTML = '<div class="text-center text-gray-500 py-8">שגיאה בטעינת גרף</div>';
        }

        // Chart 2
        try {
            const data2 = [{
                type: 'scatterpolar',
                r: [88, 85, 90, 92, 75, 95, 80, 85],
                theta: ['React', 'Vue.js', 'JavaScript', 'CSS/SCSS', 'Webpack', 'HTML5', 'Figma', 'Git'],
                fill: 'toself',
                marker: {
                    color: '#650F54'
                }
            }];

            const layout2 = {
                title: { text: 'רמת כישורים', font: { size: 16 } },
                polar: {
                    radialaxis: {
                        visible: true,
                        range: [0, 100]
                    }
                },
                margin: { t: 60, r: 20, b: 80, l: 60 },
                plot_bgcolor: '#ffffff',
                paper_bgcolor: '#ffffff',
                showlegend: false
            };

            Plotly.newPlot('skills-chart-2', data2, layout2, config);
        } catch (e) {
            console.error('Error loading chart 2', e);
            const el = document.getElementById('skills-chart-2');
            if (el) el.innerHTML = '<div class="text-center text-gray-500 py-8">שגיאה בטעינת גרף</div>';
        }

        // Chart 3
        try {
            const data3 = [{
                type: 'scatterpolar',
                r: [90, 92, 85, 88, 80, 85, 82, 78],
                theta: ['Node.js', 'AWS', 'Python', 'PostgreSQL', 'Redis', 'Microservices', 'Docker', 'Kubernetes'],
                fill: 'toself',
                marker: {
                    color: '#650F54'
                }
            }];

            const layout3 = {
                title: { text: 'רמת כישורים', font: { size: 16 } },
                polar: {
                    radialaxis: {
                        visible: true,
                        range: [0, 100]
                    }
                },
                margin: { t: 60, r: 20, b: 80, l: 60 },
                plot_bgcolor: '#ffffff',
                paper_bgcolor: '#ffffff',
                showlegend: false
            };

            Plotly.newPlot('skills-chart-3', data3, layout3, config);
        } catch (e) {
            console.error('Error loading chart 3', e);
            const el = document.getElementById('skills-chart-3');
            if (el) el.innerHTML = '<div class="text-center text-gray-500 py-8">שגיאה בטעינת גרף</div>';
        }
    }
}
