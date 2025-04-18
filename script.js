document.addEventListener('DOMContentLoaded', () => {
  const categorySelect = document.getElementById('category');
  const executiveFields = document.getElementById('executiveFields');
  const nonExecFields = document.getElementById('nonExecFields');
  const form = document.getElementById('leaveForm');
  const resultDiv = document.getElementById('result');

  // Toggle visibility based on category selection
  categorySelect.addEventListener('change', () => {
    const category = categorySelect.value;
    executiveFields.style.display = category === 'executive' ? 'block' : 'none';
    nonExecFields.style.display = category === 'non-executive' ? 'block' : 'none';
    resultDiv.innerHTML = '';
  });

  // Form submission handler
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const category = categorySelect.value;
    resultDiv.innerHTML = '';

    // EXECUTIVE LOGIC
    if (category === 'executive') {
      const basicPay = parseFloat(document.getElementById('basicPayExec').value);
      const idaRate = parseFloat(document.getElementById('ida').value);
      const elDaysValue = document.getElementById('elExec').value.trim();
      const hplDaysValue = document.getElementById('hpl').value.trim();

      if (isNaN(basicPay) || basicPay <= 0 || isNaN(idaRate) || idaRate < 0) {
        resultDiv.innerHTML = `<p>Please enter valid Basic Pay and IDA Rate.</p>`;
        return;
      }

      const idaAmount = basicPay * (idaRate / 100);
      const perDayRate = (basicPay / 30) + idaAmount;

      let resultHTML = `<h3>Executive Leave Encashment Summary</h3>`;
      let total = 0;
      let validInput = false;

      if (elDaysValue !== '' && !isNaN(elDaysValue) && parseInt(elDaysValue) > 0) {
        const elDays = parseInt(elDaysValue);
        const elEncashment = perDayRate * elDays;
        total += elEncashment;
        validInput = true;
        resultHTML += `<p><strong>Earned Leave (EL):</strong> ₹${elEncashment.toFixed(2)} for ${elDays} day(s)</p>`;
      }

      if (hplDaysValue !== '' && !isNaN(hplDaysValue) && parseInt(hplDaysValue) > 0) {
        const hplDays = parseInt(hplDaysValue);
        const hplEncashment = perDayRate * (hplDays / 2);
        total += hplEncashment;
        validInput = true;
        resultHTML += `<p><strong>Half Pay Leave (HPL):</strong> ₹${hplEncashment.toFixed(2)} for ${hplDays} day(s)</p>`;
      }

      if (validInput) {
        resultHTML += `<p><strong>Total Encashment:</strong> ₹${total.toFixed(2)}</p>`;
      } else {
        resultHTML = `<p>Please enter valid EL or HPL days.</p>`;
      }

      resultDiv.innerHTML = resultHTML;

    // NON-EXECUTIVE LOGIC
    } else if (category === 'non-executive') {
      const basicPayInput = document.getElementById('basicPayNonExec');
      const vdaInput = document.getElementById('vda');
      const elDaysInput = document.getElementById('elNonExec');
      const empType = document.querySelector('input[name="empType"]:checked');

      const basicPay = parseFloat(basicPayInput.value);
      const vdaRate = parseFloat(vdaInput.value);
      const elDays = parseInt(elDaysInput.value);

      if (
        isNaN(basicPay) || basicPay <= 0 ||
        isNaN(vdaRate) || vdaRate < 0 ||
        isNaN(elDays) || elDays <= 0
      ) {
        resultDiv.innerHTML = `<p>Please enter valid Basic Pay, VDA Rate, and EL Days.</p>`;
        return;
      }

      if (!empType) {
        resultDiv.innerHTML = `<p>Please select Employee Type (Daily Rated or Monthly Rated).</p>`;
        return;
      }

      const sda = basicPay * (1.795 / 100);
      const vda = basicPay * (vdaRate / 100);
      const totalPay = basicPay + sda + vda;
      const perDayRate = empType.value === 'daily' ? totalPay : totalPay / 26;
      const total = perDayRate * elDays;

      resultDiv.innerHTML = `
        <h3>Non-Executive Leave Encashment Summary</h3>
        <p><strong>Employee Type:</strong> ${empType.value === 'daily' ? 'Daily Rated' : 'Monthly Rated'}</p>
        <p><strong>Earned Leave (EL):</strong> ₹${total.toFixed(2)} for ${elDays} day(s)</p>
      `;
    } else {
      resultDiv.innerHTML = `<p>Please select a valid employee category.</p>`;
    }
  });
});

// HAMBURGER MENU TOGGLE FUNCTION
function toggleMenu() {
  const nav = document.getElementById('navMenu');
  nav.classList.toggle('show');
}
