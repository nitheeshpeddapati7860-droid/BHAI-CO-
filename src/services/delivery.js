export const checkPincode = async (pincode) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock validation
      if (!pincode || pincode.length !== 6 || isNaN(pincode)) {
        resolve({
          valid: false,
          message: "Please enter a valid 6-digit pincode."
        });
        return;
      }
      
      // Calculate a mock delivery date 3-5 days in the future
      const today = new Date();
      const minDate = new Date(today);
      minDate.setDate(today.getDate() + 3);
      
      const maxDate = new Date(today);
      maxDate.setDate(today.getDate() + 5);
      
      const formatOptions = { month: 'short', day: 'numeric' };
      const dateString = `${minDate.toLocaleDateString('en-IN', formatOptions)} – ${maxDate.toLocaleDateString('en-IN', formatOptions)}`;

      resolve({
        valid: true,
        message: `Delivery estimate: ${dateString}`
      });
    }, 500);
  });
};
