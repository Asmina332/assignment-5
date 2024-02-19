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

const successModal = document.getElementById("successModal");

const nextButton = document.getElementById("next");
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const emailInput = document.getElementById("email");
let nameValue;
let phoneValue;
let emailValue;

const inputForm = document.getElementById("input-form");

const couponInput = document.getElementById("coupon-input");
let couponValue;
const couponButton = document.getElementById("coupon-button");

// console.log(coupons[0]);

const hiddenTicketSection = document.getElementById("hidden-ticket-section");
// const hiddenTotalSection = document.getElementById("hidden-total-section");
const hiddenCouponSection = document.getElementById("hidden-coupon-section");
const hiddenGrandTotal = document.getElementById("hidden-grand-total");

const totalContent = document.querySelector(".total");
const discountContent = document.getElementById("hidden-discount");
const grandTotalContent = document.querySelector(".grand-total");
// console.log(totalContents);

const availableSeatText = document.querySelector(".available-seat");

const seatsContainer = document.querySelector(".dynamic-ticket");
// console.log(seatsContainer);
const seatNumText = document.querySelector(".seat-num");

const availableSeats = document.querySelectorAll(".seat");
availableSeatnum = availableSeats.length;

//getting coupon code
couponButton.addEventListener("click", function (e) {
  e.preventDefault();
  couponValue = couponInput.value;

  //checking coupon value
  coupons.forEach((coupon) => {
    if (coupon.code === couponValue) {
      hiddenGrandTotal.classList.remove("hidden");
      hiddenCouponSection.classList.add("hidden");
      couponSuccess = true;
      discountRate = coupon.discountRate;
      discount = (totalPrice * discountRate) / 100;
      discountContent.textContent = `- BDT ${discount}`;
      grandTotal = totalPrice - discount;
      grandTotalContent.textContent = `BDT ${grandTotal}`;
    }
  });

  if (!couponSuccess) {
    alert("Sorry! wrong coupon");
    // calculating grand total
  }
});

availableSeats.forEach((seat, i) => {
  seat.addEventListener("click", function () {
    hiddenTicketSection.classList.remove("hidden");
    // hiddenTotalSection.classList.remove("hidden");
    if (reservedSeats.length < 4 && !reservedSeats.includes(seat.id)) {
      reservedSeats.push(seat.id);

      seat.classList.add("bg-[#1DD100]");
      seat.classList.remove("opacity-50");
      availableSeatnum--;
      availableSeatText.textContent = `${availableSeatnum} ${
        availableSeatnum === 1 ? `seat` : `seats`
      } left`;

      // Append the new line of HTML to the seats container
      seatsContainer.innerHTML += `
        <div class="grid grid-cols-12 mt-2">
          <div class="col-span-4">
            <p class="font-inter text-light-black opacity-60">${seat.id}</p>
          </div>
          <div class="col-span-4">
            <p class="font-inter text-light-black opacity-60">Economy</p>
          </div>
          <div class="col-span-4 ml-auto">
            <p class="font-inter text-light-black opacity-60">550</p>
          </div>
        </div>
      `;

      // handling total price
      totalPrice = reservedSeats.length * ticketPrice;
      // console.log(totalPrice);

      totalContent.textContent = `BDT ${totalPrice}`;
      seatNumText.textContent = `${reservedSeats.length}`;

      //next button enabling
      checkInputs();

      // enabling coupon button

      if (reservedSeats.length === 4) {
        hiddenCouponSection.classList.remove("hidden");
        couponButton.removeAttribute("disabled");
      }
    }
  });
});

// Add event listeners to input fields
nameInput.addEventListener("input", checkInputs);
phoneInput.addEventListener("input", checkInputs);
emailInput.addEventListener("input", checkInputs);

function checkInputs() {
  var nameValue = nameInput.value.trim();
  var phoneValue = phoneInput.value.trim();
  var emailValue = emailInput.value.trim();

  // Check if all input fields are filled
  if (nameValue !== "" && phoneValue !== "" && reservedSeats.length) {
    // Enable the next button
    nextButton.disabled = false;
  } else {
    // Disable the next button
    nextButton.disabled = true;
  }
}

// ///////////////MODAL//////////////
////////////////////////////////////
///////////////////////////////////

inputForm.addEventListener("submit", function (event) {
  // Prevent the default form submission behavior
  event.preventDefault();
});

function openModal() {
  var modal = document.getElementById("my_modal_5");
  modal.showModal(); // Show the modal
  // Customize modal styles here
  modal.style.backgroundColor = "rgba(0, 0, 0, 0.5)"; // Example customization
  event.preventDefault();
}

function closeModal() {
  var modal = document.getElementById("my_modal_5");
  modal.close(); // Close the modal
}
