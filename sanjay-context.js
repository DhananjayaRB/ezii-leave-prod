// Set context to Sanjay Prabhu (241) and navigate to Leave Applications
localStorage.setItem('user_id', '241');
localStorage.setItem('org_id', '13');
console.log('✅ Set context: user_id=241, org_id=13 (Sanjay Prabhu)');
window.location.href = '/leave-applications';