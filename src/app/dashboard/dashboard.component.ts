import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgFor } from '@angular/common';

declare var Plotly: any;

interface Department {
    name: string;
    icon: string;
    iconColor: string;
    activePositions: number;
    vacantPositions: number;
    staffingRate: number;
    skillGap: string;
    activeCandidates: number;
    status: string;
    statusClass: string;
}

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [NgFor],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, AfterViewInit {

    departments: Department[] = [
        { name: 'מטה', icon: 'fa-building', iconColor: 'bg-primary', activePositions: 8, vacantPositions: 1, staffingRate: 87, skillGap: 'נמוך', activeCandidates: 12, status: 'מצוין', statusClass: 'bg-green-100 text-green-700' },
        { name: 'כפסים', icon: 'fa-users', iconColor: 'bg-secondary', activePositions: 12, vacantPositions: 2, staffingRate: 83, skillGap: 'בינוני', activeCandidates: 28, status: 'טוב', statusClass: 'bg-yellow-100 text-yellow-700' },
        { name: 'מודיעין', icon: 'fa-brain', iconColor: 'bg-primaryLight', activePositions: 9, vacantPositions: 1, staffingRate: 89, skillGap: 'נמוך', activeCandidates: 18, status: 'מצוין', statusClass: 'bg-green-100 text-green-700' },
        { name: 'לוגיסטיקה', icon: 'fa-truck', iconColor: 'bg-accent', activePositions: 14, vacantPositions: 2, staffingRate: 86, skillGap: 'בינוני', activeCandidates: 34, status: 'טוב מאוד', statusClass: 'bg-green-100 text-green-700' },
        { name: 'טכנולוגיה', icon: 'fa-laptop-code', iconColor: 'bg-accentDark', activePositions: 16, vacantPositions: 5, staffingRate: 69, skillGap: 'גבוה', activeCandidates: 56, status: 'דורש שיפור', statusClass: 'bg-red-100 text-red-700' },
        { name: 'שיווק', icon: 'fa-bullhorn', iconColor: 'bg-pink-500', activePositions: 10, vacantPositions: 2, staffingRate: 80, skillGap: 'בינוני', activeCandidates: 42, status: 'טוב', statusClass: 'bg-yellow-100 text-yellow-700' },
        { name: 'אדמיניסטרציה', icon: 'fa-file-lines', iconColor: 'bg-gray-500', activePositions: 7, vacantPositions: 1, staffingRate: 86, skillGap: 'נמוך', activeCandidates: 16, status: 'טוב מאוד', statusClass: 'bg-green-100 text-green-700' },
        { name: 'מבצעי', icon: 'fa-gears', iconColor: 'bg-red-500', activePositions: 11, vacantPositions: 2, staffingRate: 82, skillGap: 'בינוני', activeCandidates: 38, status: 'טוב', statusClass: 'bg-yellow-100 text-yellow-700' }
    ];

    skillGaps = [
        { name: 'React & Frontend Development', gap: 35, current: 45, target: 80, needed: 7, color: 'bg-blue-600', gapColor: 'text-red-600' },
        { name: 'Cloud Infrastructure (AWS/Azure)', gap: 28, current: 52, target: 80, needed: 5, color: 'bg-orange-500', gapColor: 'text-orange-600' },
        { name: 'Data Analysis & BI', gap: 22, current: 58, target: 80, needed: 4, color: 'bg-blue-800', gapColor: 'text-yellow-600' },
        { name: 'Cybersecurity', gap: 40, current: 40, target: 80, needed: 6, color: 'bg-red-500', gapColor: 'text-red-600' },
        { name: 'Project Management (Agile)', gap: 12, current: 68, target: 80, needed: 2, color: 'bg-green-500', gapColor: 'text-green-600' },
        { name: 'UX/UI Design', gap: 25, current: 55, target: 80, needed: 3, color: 'bg-purple-500', gapColor: 'text-yellow-600' }
    ];

    ngOnInit() {
    }

    ngAfterViewInit() {
        // Initialize charts after view is ready
        setTimeout(() => {
            this.initializeCharts();
        }, 100);
    }

    initializeCharts() {
        if (typeof Plotly === 'undefined') {
            console.error('Plotly is not loaded');
            return;
        }

        try {
            // Skill Gap Chart
            const data1 = [{
                type: 'bar',
                x: ['React/Frontend', 'Cloud Infrastructure', 'Data Analysis', 'Cybersecurity', 'Project Management', 'UX/UI Design'],
                y: [35, 28, 22, 40, 12, 25],
                marker: { color: ['#650F54', '#FB8F67', '#541388', '#EF4444', '#10B981', '#9DD9D2'] }
            }];

            const layout1 = {
                title: { text: '', font: { size: 0 } },
                xaxis: { title: '' },
                yaxis: { title: 'פער באחוזים' },
                margin: { t: 20, r: 20, b: 80, l: 60 },
                plot_bgcolor: '#ffffff',
                paper_bgcolor: '#ffffff'
            };

            Plotly.newPlot('skill-gap-chart', data1, layout1, { responsive: true, displayModeBar: false, displaylogo: false });

            // Positions by Category Chart
            const data2 = [{
                type: 'pie',
                labels: ['מטה', 'כפסים', 'מודיעין', 'לוגיסטיקה', 'טכנולוגיה', 'שיווק', 'אדמיניסטרציה', 'מבצעי'],
                values: [8, 12, 9, 14, 16, 10, 7, 11],
                marker: { colors: ['#650F54', '#FB8F67', '#541388', '#9DD9D2', '#650F54', '#EC4899', '#6B7280', '#EF4444'] }
            }];

            const layout2 = {
                margin: { t: 20, r: 20, b: 20, l: 20 },
                plot_bgcolor: '#ffffff',
                paper_bgcolor: '#ffffff',
                showlegend: true
            };

            Plotly.newPlot('positions-by-category-chart', data2, layout2, { responsive: true, displayModeBar: false, displaylogo: false });

            // Hiring Trend Chart
            const data3 = [{
                type: 'scatter',
                mode: 'lines',
                x: ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני'],
                y: [12, 15, 18, 22, 28, 34],
                line: { color: '#650F54', width: 3 },
                fill: 'tozeroy',
                fillcolor: 'rgba(101, 15, 84, 0.1)'
            }];

            const layout3 = {
                xaxis: { title: '' },
                yaxis: { title: 'מספר גיוסים' },
                margin: { t: 20, r: 20, b: 60, l: 60 },
                plot_bgcolor: '#ffffff',
                paper_bgcolor: '#ffffff'
            };

            Plotly.newPlot('hiring-trend-chart', data3, layout3, { responsive: true, displayModeBar: false, displaylogo: false });

            // Staffing Rate Chart
            const data4 = [{
                type: 'bar',
                x: ['מטה', 'כפסים', 'מודיעין', 'לוגיסטיקה', 'טכנולוגיה', 'שיווק', 'אדמיניסטרציה', 'מבצעי'],
                y: [87, 83, 89, 86, 69, 80, 86, 82],
                marker: {
                    color: [87, 83, 89, 86, 69, 80, 86, 82],
                    colorscale: [[0, '#EF4444'], [0.5, '#F59E0B'], [1, '#10B981']],
                    showscale: false
                }
            }];

            const layout4 = {
                xaxis: { title: '' },
                yaxis: { title: 'אחוז איוש', range: [0, 100] },
                margin: { t: 20, r: 20, b: 80, l: 60 },
                plot_bgcolor: '#ffffff',
                paper_bgcolor: '#ffffff'
            };

            Plotly.newPlot('staffing-rate-chart', data4, layout4, { responsive: true, displayModeBar: false, displaylogo: false });

            // Time to Fill Chart
            const data5 = [{
                type: 'bar',
                x: ['מטה', 'כפסים', 'מודיעין', 'לוגיסטיקה', 'טכנולוגיה', 'שיווק', 'אדמיניסטרציה', 'מבצעי'],
                y: [28, 32, 25, 30, 45, 38, 27, 33],
                marker: { color: '#650F54' }
            }];

            const layout5 = {
                xaxis: { title: '' },
                yaxis: { title: 'ימים' },
                margin: { t: 20, r: 20, b: 80, l: 60 },
                plot_bgcolor: '#ffffff',
                paper_bgcolor: '#ffffff'
            };

            Plotly.newPlot('time-to-fill-chart', data5, layout5, { responsive: true, displayModeBar: false, displaylogo: false });

        } catch (e) {
            console.error('Error generating charts:', e);
        }
    }

    getStaffingRateColor(rate: number): string {
        if (rate >= 85) return 'bg-green-500';
        if (rate >= 75) return 'bg-yellow-500';
        return 'bg-red-500';
    }

    getSkillGapBadgeClass(gap: string): string {
        if (gap === 'נמוך') return 'bg-green-100 text-green-700';
        if (gap === 'בינוני') return 'bg-yellow-100 text-yellow-700';
        return 'bg-red-100 text-red-700';
    }
}
