// MedMind AI - Simulated AI Handler (No API needed)
class SarvamAIHandler {
  constructor() {
    this.apiKey = '';
    this.messages = [];
  }

  setApiKey(key) {
    this.apiKey = key;
    console.log('✅ AI Ready (Simulated)');
  }

  async getAIResponse(userMessage) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const msg = userMessage.toLowerCase();

    // Smart responses based on keywords
    let response = '';

    if (msg.includes('medication') || msg.includes('meds') || msg.includes('medicine')) {
      response = 'Based on your profile, you\'re taking: Aspirin 100mg daily for heart health, Vitamin D3 2000 IU for bone health, and Lisinopril 10mg for blood pressure management. Always consult your doctor before making changes.';
    } 
    else if (msg.includes('appointment') || msg.includes('doctor')) {
      response = 'You have 2 upcoming appointments: Dr. Emily Rodriguez on June 22 at 10:00 AM (General Checkup), and Dr. James Chen on June 25 at 2:00 PM (Cardiology Follow-up).';
    } 
    else if (msg.includes('mood') || msg.includes('feeling') || msg.includes('health')) {
      response = 'Your recent mood entries show you\'ve been mostly happy 😊 with good energy levels. Your stress has been manageable. Keep up the positive momentum!';
    } 
    else if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
      response = 'Hey there! 👋 I\'m MedMind AI, your personal health assistant. I can help you with medications, appointments, mood tracking, and general health questions. What would you like to know?';
    } 
    else if (msg.includes('help') || msg.includes('what can')) {
      response = 'I can help you with:\n✓ Medication information & reminders\n✓ Doctor appointments & scheduling\n✓ Mental health tracking\n✓ Health metrics & wellness tips\n✓ General health questions\n\nWhat would you like to know?';
    } 
    else if (msg.includes('weight') || msg.includes('blood pressure') || msg.includes('heart rate')) {
      response = 'Your current health metrics: Weight: 72 kg, Blood Pressure: 120/80 mmHg, Heart Rate: 72 bpm, Today\'s Steps: 8,234. All looking good! Keep up the healthy lifestyle.';
    } 
    else if (msg.includes('refill') || msg.includes('prescription')) {
      response = 'Your next medication refills: Aspirin on July 15, Vitamin D3 on August 1, Lisinopril on July 1. Don\'t forget to order in advance!';
    } 
    else if (msg.includes('mental health') || msg.includes('stress') || msg.includes('anxiety')) {
      response = 'Mental health is important! Consider: Regular meditation or yoga, talking to a counselor, maintaining social connections, and getting adequate sleep. Dr. Lisa Thompson (Mental Health Counselor) is available if you need professional support.';
    } 
    else if (msg.includes('exercise') || msg.includes('workout') || msg.includes('fitness')) {
      response = 'Great question! I recommend: 150 minutes of moderate cardio per week, strength training 2-3x weekly, and flexibility work. Your current step count (8,234) is on track. Keep moving! 💪';
    } 
    else if (msg.includes('diet') || msg.includes('nutrition') || msg.includes('food')) {
      response = 'For heart health (given your medications), focus on: Low sodium foods, omega-3 rich fish, whole grains, lots of vegetables, and limited saturated fats. Consider consulting a nutritionist for personalized advice.';
    } 
    else if (msg.includes('thank') || msg.includes('thanks')) {
      response = 'You\'re welcome! I\'m here to help you stay healthy. Feel free to ask me anything about your medications, appointments, or wellness. 😊';
    } 
    else if (msg.includes('bye') || msg.includes('goodbye')) {
      response = 'Take care! Remember to take your medications on time and stay healthy. See you soon! 👋';
    } 
    else {
      // Default response for unknown queries
      const responses = [
        'That\'s a great question! Based on your health profile, I\'d recommend consulting with one of your doctors for detailed advice. Would you like information about scheduling an appointment?',
        'I can help with that! Is there anything specific about your medications, appointments, or health metrics I can assist with?',
        'Good point! Remember to stay consistent with your medications and regular health checkups. Is there anything else I can help you with?',
        'That\'s important! Your overall health depends on consistent care. Would you like me to provide more information about any of your current medications or appointments?',
        'I understand. Taking care of your health is a journey! Feel free to ask me about your medications, appointments, mood tracking, or any health-related questions.'
      ];
      response = responses[Math.floor(Math.random() * responses.length)];
    }

    // Store in history
    this.messages.push({ role: 'user', content: userMessage });
    this.messages.push({ role: 'assistant', content: response });

    return response;
  }

  clearHistory() {
    this.messages = [];
  }
}

window.sarvamAI = new SarvamAIHandler();
console.log('✅ Simulated AI Loaded');