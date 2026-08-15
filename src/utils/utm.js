export const initUTMPersistence = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
  let hasUtm = false;

  utmParams.forEach(param => {
    if (urlParams.has(param)) {
      sessionStorage.setItem(`bhai_co_${param}`, urlParams.get(param));
      hasUtm = true;
    }
  });

  if (hasUtm) {
    console.log('[Analytics] UTM parameters captured and persisted for session.');
  }
};

export const getUTMParams = () => {
  const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
  const params = {};
  
  utmParams.forEach(param => {
    const value = sessionStorage.getItem(`bhai_co_${param}`);
    if (value) {
      params[param] = value;
    }
  });
  
  return params;
};
