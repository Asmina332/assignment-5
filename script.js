let availableSeatnum;
let discountRate;
let discount;
let grandTotal;
let couponSuccess;
let reservedSeats = [];
const ticketPrice = 550;
let totalPrice;
const coupons = [
  {
    code: "NEW15",
    discountRate: 15,
  },
  {
    code: "Couple 20",
    discountRate: 20,
  },
];

// Selectors
const successModal = document.getElementById("successModal");
const nextButton = document.getElementById("next");
const inputForm = document.getElementById("input-form");
const couponInput = document.getElementById("coupon-input");
const couponButton = document.getElementById("coupon-button");
const hiddenTicketSection = document.getElementById("hidden-ticket-section");
const hiddenCouponSection = document.getElementById("hidden-coupon-section");
const hiddenGrandTotal = document.getElementById("hidden-grand-total");
const totalContent = document.querySelector(".total");
const discountContent = document.getElementById("hidden-discount");
const grandTotalContent = document.querySelector(".grand-total");
const availableSeatText = document.querySelector(".available-seat");
const seatsContainer = document.querySelector(".dynamic-ticket");
const seatNumText = document.querySelector(".seat-num");
const availableSeats = document.querySelectorAll(".seat");

// Event listeners
couponButton.addEventListener("click", handleCoupon);
availableSeats.forEach(seat => seat.addEventListener("click", handleSeatSelection));
inputForm.addEventListener("submit", handleSubmit);
nameInput.addEventListener("input", checkInputs);
phoneInput.addEventListener("input", checkInputs);
emailInput.addEventListener("input", checkInputs);

// Functions
function handleCoupon(event) {
  event.preventDefault();
  couponValue = couponInput.value;
  const selectedCoupon = coupons.find(coupon => coupon.code === couponValue);
  if (selectedCoupon) {
    hiddenGrandTotal.classList.remove("hidden");
    hiddenCouponSection.classList.add("hidden");
    couponSuccess = true;
    discountRate = selectedCoupon.discountRate;
    discount = (totalPrice * discountRate) / 100;
    discountContent.textContent = `- BDT ${discount}`;
    grandTotal = totalPrice - discount;
    grandTotalContent.textContent = `BDT ${grandTotal}`;
  } else {
    alert("Sorry! wrong coupon");
  }
}

function handleSeatSelection() {
  hiddenTicketSection.classList.remove("hidden");
  if (reservedSeats.length < 4 && !reservedSeats.includes(this.id)) {
    reservedSeats.push(this.id);
    this.classList.add("bg-[#1DD100]");
    this.classList.remove("opacity-50");
    availableSeatnum--;
    availableSeatText.textContent = `${availableSeatnum} ${availableSeatnum === 1 ? `seat` : `seats`} left`;
    appendSeatHTML(this.id);
    totalPrice = reservedSeats.length * ticketPrice;
    totalContent.textContent = `BDT ${totalPrice}`;
    seatNumText.textContent = `${reservedSeats.length}`;
    if (reservedSeats.length === 4) {
      hiddenCouponSection.classList.remove("hidden");
      couponButton.removeAttribute("disabled");
    }
  }
  checkInputs();
}

function appendSeatHTML(seatId) {
  const seatHTML = `
    <div class="grid grid-cols-12 mt-2">
      <div class="col-span-4">
        <p class="font-inter text-light-black opacity-60">${seatId}</p>
      </div>
      <div class="col-span-4">
        <p class="font-inter text-light-black opacity-60">Economy</p>
      </div>
      <div class="col-span-4 ml-auto">
        <p class="font-inter text-light-black opacity-60">550</p>
      </div>
    </div>`;
  seatsContainer.innerHTML += seatHTML;
}

function handleSubmit(event) {
  event.preventDefault();
  openModal();
}

function checkInputs() {
  const nameValue = nameInput.value.trim();
  const phoneValue = phoneInput.value.trim();
  const emailValue = emailInput.value.trim();
  nextButton.disabled = !(nameValue !== "" && phoneValue !== "" && reservedSeats.length);
}

function openModal() {
  const modal = document.getElementById("my_modal_5");
  modal.showModal();
  modal.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
}

function closeModal() {
  const modal = document.getElementById("my_modal_5");
  modal.close();
}
