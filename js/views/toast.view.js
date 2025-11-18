export const buildToast = (message, type ) => {
  // Config for each type
  const toastConfig = {
    error: {
      bgClass: 'bg-danger',
      icon: '❌',
      title: 'Error'
    },
    success: {
      bgClass: 'bg-success',
      icon: '✅',
      title: 'Success'
    },
    info: {
      bgClass: 'bg-info',
      icon: 'ℹ️',
      title: 'Information'
    }
  };
  
  const config = toastConfig[type] || toastConfig.error;
  
  return `
    <div style="position: fixed; bottom: 0; right: 0; padding: 1rem; z-index: 99999; class="${type}">
      <div class="custom-toast ${config.bgClass} text-white">
        <div class="toast-header ${config.bgClass} text-white d-flex justify-content-between align-items-center p-2 border-bottom border-white-50"> 
          <strong class="me-auto">${config.icon} ${config.title}</strong> 
          <button type="button" class="btn-close-custom text-white">❌</button>
        </div>
        <div class="toast-body p-3">${message}</div>
      </div>
    </div>
  `;
}