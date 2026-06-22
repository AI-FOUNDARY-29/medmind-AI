// MedMind AI - Core App Logic
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}

class PageRouter {
  constructor() {
    this.currentPage = document.body.dataset.page || 'index';
    this.initNavigation();
    this.loadDemoDataIfNeeded();
  }

  initNavigation() {
    document.querySelectorAll('a[href*=".html"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) return;
        e.preventDefault();
        this.navigateTo(href);
      });
    });
    this.updateActiveNav();
  }

  navigateTo(page) {
    const main = document.querySelector('main') || document.body;
    main.style.opacity = '0.7';
    setTimeout(() => { window.location.href = page; }, 150);
  }

  updateActiveNav() {
    const currentFile = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('a[href*=".html"]').forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentFile || (currentFile === '' && href === 'index.html')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  loadDemoDataIfNeeded() {
    if (!localStorage.getItem('medmind_data')) {
      const dataManager = new DataManager();
      dataManager.setData(dataManager.getDefaultData());
    }
  }
}

class DataManager {
  constructor() {
    this.storageKey = 'medmind_data';
  }

  getData() {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : this.getDefaultData();
  }

  setData(data) {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  getDefaultData() {
    return {
      user: {
        name: 'Alex Johnson',
        email: 'alex@example.com',
        age: 28,
        phone: '+1 (555) 123-4567',
        bloodType: 'O+',
        allergies: 'Penicillin, Shellfish',
        emergencyContact: 'Sarah Johnson (Sister) - +1 (555) 987-6543'
      },
      doctors: [
        {
          id: 1,
          name: 'Dr. Emily Rodriguez',
          specialty: 'General Practitioner',
          hospital: 'City Medical Center',
          rating: 4.8,
          nextAvailable: '2024-06-22 10:00 AM'
        },
        {
          id: 2,
          name: 'Dr. James Chen',
          specialty: 'Cardiologist',
          hospital: 'Heart Health Institute',
          rating: 4.9,
          nextAvailable: '2024-06-23 2:00 PM'
        },
        {
          id: 3,
          name: 'Dr. Lisa Thompson',
          specialty: 'Mental Health Counselor',
          hospital: 'Wellness Clinic',
          rating: 4.7,
          nextAvailable: '2024-06-24 3:30 PM'
        }
      ],
      appointments: [
        {
          id: 1,
          doctorName: 'Dr. Emily Rodriguez',
          specialty: 'General Practitioner',
          date: '2024-06-22',
          time: '10:00 AM',
          status: 'Confirmed',
          notes: 'Annual checkup'
        },
        {
          id: 2,
          doctorName: 'Dr. James Chen',
          specialty: 'Cardiologist',
          date: '2024-06-25',
          time: '2:00 PM',
          status: 'Pending',
          notes: 'Follow-up on blood pressure'
        }
      ],
      medications: [
        {
          id: 1,
          name: 'Aspirin',
          dosage: '100mg',
          frequency: 'Once daily',
          purpose: 'Heart health',
          nextDose: '2024-06-21 8:00 AM',
          refillDate: '2024-07-15',
          taken: ['2024-06-20', '2024-06-19', '2024-06-18']
        },
        {
          id: 2,
          name: 'Vitamin D3',
          dosage: '2000 IU',
          frequency: 'Once daily',
          purpose: 'Bone health',
          nextDose: '2024-06-21 9:00 AM',
          refillDate: '2024-08-01',
          taken: ['2024-06-20', '2024-06-19']
        },
        {
          id: 3,
          name: 'Lisinopril',
          dosage: '10mg',
          frequency: 'Once daily',
          purpose: 'Blood pressure',
          nextDose: '2024-06-21 7:00 PM',
          refillDate: '2024-07-01',
          taken: ['2024-06-20', '2024-06-19', '2024-06-18', '2024-06-17']
        }
      ],
      moodLogs: [
        { date: '2024-06-20', mood: '😊', energy: 8, stress: 3, notes: 'Great day' },
        { date: '2024-06-19', mood: '😌', energy: 6, stress: 5, notes: 'Busy' },
        { date: '2024-06-18', mood: '😊', energy: 7, stress: 2, notes: 'Good workout' },
        { date: '2024-06-17', mood: '😐', energy: 5, stress: 7, notes: 'Stressful' },
        { date: '2024-06-16', mood: '😊', energy: 8, stress: 2, notes: 'Relaxing' }
      ],
      healthMetrics: {
        weight: { current: 72, unit: 'kg' },
        bloodPressure: { current: '120/80' },
        heartRate: { current: 72, unit: 'bpm' },
        steps: { today: 8234, goal: 10000 }
      }
    };
  }

  markMedicationTaken(medId) {
    const data = this.getData();
    const med = data.medications.find(m => m.id === medId);
    if (med) {
      const today = new Date().toISOString().split('T')[0];
      if (!med.taken.includes(today)) {
        med.taken.push(today);
      }
    }
    this.setData(data);
    return med;
  }
}

class ContentRenderer {
  constructor(dataManager) {
    this.data = dataManager;
  }

  renderDashboard() {
    const data = this.data.getData();
    const dashboard = document.querySelector('[data-section="dashboard"]');
    if (!dashboard) return;

    const html = `
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-label">Next Appointment</div>
          <div class="stat-value">${data.appointments[0]?.date || 'None'}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Active Medications</div>
          <div class="stat-value">${data.medications.length}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Today's Steps</div>
          <div class="stat-value">${data.healthMetrics.steps.today}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Current Mood</div>
          <div class="stat-value">${data.moodLogs[0]?.mood || '😐'}</div>
        </div>
      </div>
    `;
    dashboard.innerHTML = html;
  }

  renderMedications() {
    const data = this.data.getData();
    const medsContainer = document.querySelector('[data-section="medications"]');
    if (!medsContainer) return;

    let html = '';
    data.medications.forEach(med => {
      const todayTaken = med.taken.includes(new Date().toISOString().split('T')[0]);
      html += `
        <div class="med-card ${todayTaken ? 'taken' : ''}">
          <div class="med-header">
            <h3>${med.name}</h3>
            <span class="dosage">${med.dosage}</span>
          </div>
          <p class="med-purpose">${med.purpose}</p>
          <p class="med-frequency">${med.frequency}</p>
          <button class="btn-small ${todayTaken ? 'taken' : ''}" onclick="contentRenderer.markMedTaken(${med.id})">
            ${todayTaken ? '✓ Taken Today' : 'Mark as Taken'}
          </button>
        </div>
      `;
    });
    medsContainer.innerHTML = html;
  }

  renderAppointments() {
    const data = this.data.getData();
    const apptContainer = document.querySelector('[data-section="appointments"]');
    if (!apptContainer) return;

    let html = '';
    data.appointments.forEach(appt => {
      html += `
        <div class="appointment-card">
          <div class="appt-header">
            <h3>${appt.doctorName}</h3>
            <span class="status ${appt.status.toLowerCase()}">${appt.status}</span>
          </div>
          <p class="appt-specialty">${appt.specialty}</p>
          <p class="appt-datetime">📅 ${appt.date} at ${appt.time}</p>
          <p class="appt-notes">${appt.notes}</p>
        </div>
      `;
    });
    apptContainer.innerHTML = html || '<p>No appointments</p>';
  }

  renderMoodTracker() {
    const data = this.data.getData();
    const moodContainer = document.querySelector('[data-section="mood-history"]');
    if (!moodContainer) return;

    let html = '';
    data.moodLogs.slice(0, 7).forEach(log => {
      html += `
        <div class="mood-entry">
          <span class="mood-date">${log.date}</span>
          <span class="mood-emoji">${log.mood}</span>
          <span class="mood-energy">⚡ ${log.energy}/10</span>
          <span class="mood-stress">😰 ${log.stress}/10</span>
        </div>
      `;
    });
    moodContainer.innerHTML = html;
  }

  renderProfile() {
    const data = this.data.getData();
    const profileContainer = document.querySelector('[data-section="profile-info"]');
    if (!profileContainer) return;

    const user = data.user;
    const html = `
      <div class="profile-section">
        <h3>Personal Information</h3>
        <p><strong>Name:</strong> ${user.name}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Age:</strong> ${user.age}</p>
        <p><strong>Phone:</strong> ${user.phone}</p>
      </div>
      <div class="profile-section">
        <h3>Medical Information</h3>
        <p><strong>Blood Type:</strong> ${user.bloodType}</p>
        <p><strong>Allergies:</strong> ${user.allergies}</p>
        <p><strong>Emergency Contact:</strong> ${user.emergencyContact}</p>
      </div>
    `;
    profileContainer.innerHTML = html;
  }

  markMedTaken(medId) {
    this.data.markMedicationTaken(medId);
    this.renderMedications();
  }
}

function animatePageIn() {
  const main = document.querySelector('main') || document.body;
  main.style.opacity = '0';
  main.style.transition = 'opacity 0.3s ease-in';
  setTimeout(() => { main.style.opacity = '1'; }, 10);
}

document.addEventListener('DOMContentLoaded', () => {
  const dataManager = new DataManager();
  window.contentRenderer = new ContentRenderer(dataManager);
  const router = new PageRouter();

  animatePageIn();

  const currentPage = document.body.dataset.page || 'index';

  if (currentPage === 'home') {
    contentRenderer.renderDashboard();
    contentRenderer.renderMoodTracker();
  } else if (currentPage === 'meds') {
    contentRenderer.renderMedications();
  } else if (currentPage === 'doctor') {
    contentRenderer.renderAppointments();
  } else if (currentPage === 'profile') {
    contentRenderer.renderProfile();
  } else if (currentPage === 'mental') {
    contentRenderer.renderMoodTracker();
  }

  console.log('✅ MedMind AI initialized');
});