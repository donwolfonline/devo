interface SecurityEvent {
  type: string;
  severity: 'high' | 'medium' | 'low';
  message: string;
  category: 'authentication' | 'system' | 'network' | 'data' | 'compliance';
}

const possibleEvents: SecurityEvent[] = [
  // Authentication Events
  {
    type: 'suspicious_login',
    severity: 'high',
    message: 'Multiple failed login attempts detected from unknown IP',
    category: 'authentication'
  },
  {
    type: 'password_breach',
    severity: 'high',
    message: 'User password found in known data breach database',
    category: 'authentication'
  },
  {
    type: 'mfa_disabled',
    severity: 'medium',
    message: 'Multi-factor authentication disabled for admin account',
    category: 'authentication'
  },
  
  // System Events
  {
    type: 'system_update',
    severity: 'low',
    message: 'System security patches available for installation',
    category: 'system'
  },
  {
    type: 'resource_limit',
    severity: 'medium',
    message: 'System resource usage approaching critical threshold',
    category: 'system'
  },
  {
    type: 'service_crash',
    severity: 'high',
    message: 'Critical service crashed unexpectedly',
    category: 'system'
  },

  // Network Events
  {
    type: 'unusual_traffic',
    severity: 'medium',
    message: 'Unusual outbound network traffic detected',
    category: 'network'
  },
  {
    type: 'port_scan',
    severity: 'high',
    message: 'Potential port scanning activity detected',
    category: 'network'
  },
  {
    type: 'api_abuse',
    severity: 'high',
    message: 'Potential API rate limit abuse detected',
    category: 'network'
  },

  // Data Events
  {
    type: 'data_export',
    severity: 'medium',
    message: 'Large data export initiated outside business hours',
    category: 'data'
  },
  {
    type: 'unauthorized_access',
    severity: 'high',
    message: 'Unauthorized access attempt to sensitive data',
    category: 'data'
  },
  {
    type: 'database_change',
    severity: 'medium',
    message: 'Unexpected database schema modification detected',
    category: 'data'
  },

  // Compliance Events
  {
    type: 'policy_violation',
    severity: 'medium',
    message: 'Security policy violation detected',
    category: 'compliance'
  },
  {
    type: 'audit_failure',
    severity: 'high',
    message: 'Audit log collection temporarily failed',
    category: 'compliance'
  },
  {
    type: 'certification_expiry',
    severity: 'low',
    message: 'SSL certificate approaching expiration',
    category: 'compliance'
  }
];

export function generateSecurityEvent(): SecurityEvent {
  const randomEvent = possibleEvents[Math.floor(Math.random() * possibleEvents.length)];
  return { ...randomEvent };
}

export function simulateSystemHealth(): number {
  // Generate a random health score between 85 and 100
  return Math.floor(Math.random() * 15) + 85;
}

export function simulateUptime(): number {
  // Generate a random uptime percentage between 98 and 100
  return Number((Math.random() * 2 + 98).toFixed(2));
}

export function generateAuditLogEntry(category?: string): string {
  const actions = {
    authentication: [
      'User login successful',
      'Password changed',
      'MFA enabled',
      'Login attempt failed',
      'Session expired'
    ],
    system: [
      'System backup completed',
      'Service restarted',
      'Configuration updated',
      'Cache cleared',
      'Job scheduled'
    ],
    data: [
      'Database query executed',
      'File uploaded',
      'Record modified',
      'Report generated',
      'Backup created'
    ],
    network: [
      'API request processed',
      'Firewall rule updated',
      'DNS entry modified',
      'SSL certificate renewed',
      'Proxy configuration changed'
    ],
    compliance: [
      'Policy updated',
      'Audit log exported',
      'Permission changed',
      'Role assigned',
      'Compliance check completed'
    ]
  };

  if (category && category in actions) {
    const categoryActions = actions[category as keyof typeof actions];
    return categoryActions[Math.floor(Math.random() * categoryActions.length)];
  }

  // If no category specified, pick a random one
  const allCategories = Object.keys(actions);
  const randomCategory = allCategories[Math.floor(Math.random() * allCategories.length)];
  const categoryActions = actions[randomCategory as keyof typeof actions];
  return categoryActions[Math.floor(Math.random() * categoryActions.length)];
}

export function getEventColor(severity: string): string {
  switch (severity) {
    case 'high':
      return 'text-red-400 bg-red-500/10';
    case 'medium':
      return 'text-yellow-400 bg-yellow-500/10';
    case 'low':
      return 'text-blue-400 bg-blue-500/10';
    default:
      return 'text-gray-400 bg-gray-500/10';
  }
}

export function getCategoryIcon(category: string): string {
  switch (category) {
    case 'authentication':
      return '';
    case 'system':
      return '';
    case 'network':
      return '';
    case 'data':
      return '';
    case 'compliance':
      return '';
    default:
      return '';
  }
}
