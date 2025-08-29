import { useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import { decodeJWT, storeUserDataFromToken } from "@/lib/jwtUtils";
import { queryClient } from "@/lib/queryClient";

export default function TokenHandler() {
  const [match, params] = useRoute("/id/:token");
  const [, setLocation] = useLocation();

  console.log('[TokenHandler] Component rendered - match:', match, 'params:', params);
  console.log('[TokenHandler] Route pattern: /id/:token');
  console.log('[TokenHandler] Window location:', window.location.pathname);

  useEffect(() => {
    console.log('[TokenHandler] useEffect - match:', match, 'params:', params);
    console.log('[TokenHandler] Current location:', window.location.pathname);
    
    if (match && params?.token) {
      console.log('[TokenHandler] Processing token:', params.token);
      
      // Decode the JWT token
      const payload = decodeJWT(params.token);
      
      if (payload) {
        console.log('Decoded JWT payload:', payload);
        
        // Store user data and token in localStorage
        storeUserDataFromToken(payload, params.token).then(() => {
          // Debug: Check what's actually stored after token processing
          console.log('=== TOKEN HANDLER STORAGE DEBUG ===');
          console.log('localStorage keys after storage:', Object.keys(localStorage));
          console.log('org_id:', localStorage.getItem('org_id'));
          console.log('user_id:', localStorage.getItem('user_id'));
          console.log('jwt_token present:', !!localStorage.getItem('jwt_token'));
          console.log('role_name:', localStorage.getItem('role_name'));
          console.log('===================================');
          
          // Force authentication state to update
          queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
          
          // Wait a moment for auth state to update, then redirect based on role
          setTimeout(() => {
            const role = localStorage.getItem('role_name') || localStorage.getItem('role') || 'employee';
            console.log('User role:', role);
            
            // Admin and manager roles go to Admin Overview, others go to My Dashboard
            if (role.toLowerCase() === 'admin' || role.toLowerCase() === 'manager') {
              console.log('Redirecting admin/manager to Admin Overview...');
              setLocation('/overview');
            } else {
              console.log('Redirecting employee to My Dashboard...');
              setLocation('/employee-overview');
            }
          }, 500); // Increased delay to allow auth query to complete
        });
      } else {
        console.error('Failed to decode JWT token');
        // Redirect to landing page on invalid token
        setLocation('/');
      }
    }
  }, [match, params, setLocation]);

  // Show loading while processing token
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Processing authentication...</p>
      </div>
    </div>
  );
}