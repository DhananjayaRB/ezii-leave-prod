// Set correct context for comp-off testing (org_id 13 where data exists)
localStorage.setItem('user_id', '1435');
localStorage.setItem('org_id', '13');
localStorage.setItem('role', 'admin');
localStorage.setItem('leave_year', 'January-2025-December 2025');
console.log('✅ Context set for comp-off testing (user_id: 1435, org_id: 13)');
window.location.reload();