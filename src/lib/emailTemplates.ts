interface EmailTemplateData {
  [key: string]: string | number | boolean | string[];
}

export const emailTemplates = {
  backup_complete: {
    subject: 'Backup Completed Successfully',
    template: (data: EmailTemplateData) => `
      <h2>Backup Completed</h2>
      <p>A new backup has been created successfully.</p>
      <ul>
        <li>Backup ID: ${data.backupId}</li>
        <li>Time: ${data.timestamp}</li>
        <li>Size: ${data.size}</li>
        <li>Type: ${data.type}</li>
      </ul>
    `
  },
  backup_failed: {
    subject: 'Backup Failed',
    template: (data: EmailTemplateData) => `
      <h2>Backup Failed</h2>
      <p>A backup operation has failed.</p>
      <ul>
        <li>Time: ${data.timestamp}</li>
        <li>Error: ${data.error}</li>
      </ul>
      <p>Please check the system logs for more details.</p>
    `
  },
  settings_changed: {
    subject: 'System Settings Updated',
    template: (data: EmailTemplateData) => `
      <h2>System Settings Changed</h2>
      <p>The following system settings were updated by ${data.user}:</p>
      <ul>
        ${(data.changes as string[]).map(change => `<li>${change}</li>`).join('')}
      </ul>
      <p>Time: ${data.timestamp}</p>
    `
  },
  storage_warning: {
    subject: 'Storage Space Warning',
    template: (data: EmailTemplateData) => `
      <h2>Storage Space Warning</h2>
      <p>Your system storage space is running low:</p>
      <ul>
        <li>Used Space: ${data.used}</li>
        <li>Total Space: ${data.total}</li>
        <li>Available Space: ${data.available}</li>
      </ul>
      <p>Please consider cleaning up old backups or increasing storage capacity.</p>
    `
  }
};

export const sendEmail = async (
  template: keyof typeof emailTemplates,
  data: EmailTemplateData,
  recipients: string[]
) => {
  const { subject, template: templateFn } = emailTemplates[template];
  const html = templateFn(data);

  const response = await fetch('/api/email/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      subject,
      html,
      recipients
    })
  });

  if (!response.ok) {
    throw new Error('Failed to send email');
  }

  return response.json();
};
