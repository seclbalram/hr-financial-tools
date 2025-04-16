document.addEventListener('DOMContentLoaded', () => {
    const categorySelect = document.getElementById('category');
    const executiveFields = document.getElementById('executiveFields');
    const nonExecFields = document.getElementById('nonExecFields');
    const form = document.getElementById('leaveForm');
    const resultDiv = document.getElementById('result');
  
    categorySelect.addEventListener('change', () => {
      const category = categorySelect.value;
      executiveFields.style.display = category === 'executive' ? 'block' : 'none';
      nonExecFields.style.display = category === 'non-executive' ? 'block' : 'none';
      resultDiv.innerHTML = '';
    });
  
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const category = categorySelect.value;
  
      if (category === 'executive') {
        const basicPay = parseFloat(document.getElementById('basicPayExec').value) || 0;
        const idaRate = parseFloat(document.getElementById('ida').value) || 0;
        const elDays = parseInt(document.getElementById('elExec').value) || 0;
        const hplDays = parseInt(document.getElementById('hpl').value) || 0;
  
        const idaAmount = basicPay * (idaRate / 100);
        const perDayRate = (basicPay / 30) + idaAmount;
  
        let resultHTML = `<h3>Executive Leave Encashment Summary</h3>`;
        let total = 0;
  
        if (elDays > 0) {
          const elEncashment = perDayRate * elDays;
          total += elEncashment;
          resultHTML += `<p><strong>Earned Leave (EL):</strong> ₹${elEncashment.toFixed(2)} for ${elDays} day(s)</p>`;
        }
  
        if (hplDays > 0) {
          const hplEncashment = perDayRate * (hplDays / 2);
          total += hplEncashment;
          resultHTML += `<p><strong>Half Pay Leave (HPL):</strong> ₹${hplEncashment.toFixed(2)} for ${hplDays} day(s)</p>`;
        }
  
        if (elDays > 0 && hplDays > 0) {
          resultHTML += `<p><strong>Total Encashment:</strong> ₹${total.toFixed(2)}</p>`;
        }
  
        resultDiv.innerHTML = resultHTML;
  
      } else if (category === 'non-executive') {
        const basicPay = parseFloat(document.getElementById('basicPayNonExec').value) || 0;
        const vdaRate = parseFloat(document.getElementById('vda').value) || 0;
        const elDays = parseInt(document.getElementById('elNonExec').value) || 0;
        const empType = document.querySelector('input[name="empType"]:checked');
  
        if (!empType) {
          resultDiv.innerHTML = `<p>Please select whether the employee is Daily Rated or Monthly Rated.</p>`;
          return;
        }
  
        const sda = basicPay * (1.795 / 100);
        const vda = basicPay * (vdaRate / 100);
        const totalPay = basicPay + sda + vda;
  
        let perDayRate;
        if (empType.value === 'daily') {
          perDayRate = totalPay;
        } else {
          perDayRate = totalPay / 26;
        }
  
        const total = perDayRate * elDays;
  
        resultDiv.innerHTML = `
          <h3>Non-Executive Leave Encashment Summary</h3>
          <p><strong>Employee Type:</strong> ${empType.value === 'daily' ? 'Daily Rated' : 'Monthly Rated'}</p>
          <p><strong>Earned Leave (EL):</strong> ₹${total.toFixed(2)} for ${elDays} day(s)</p>
        `;
      } else {
        resultDiv.innerHTML = `<p>Please select a valid employee category and fill in all required fields.</p>`;
      }
    });
  });
  
  function toggleMenu() {
    const nav = document.getElementById('navMenu');
    nav.classList.toggle('show');
  }
  