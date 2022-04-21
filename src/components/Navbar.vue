<template>
  <div>
    <div class="navbar--background">
      <div class="navbar">
        <div class="navbar__navegation">
          <div class="navbar__navegation--logo">
            <router-link
              @click="reload()"
              class="logo__container router-link"
              to="/"
            >
              <p class="logo__container--text">G-Airlines</p>
              <i class="logo__container--img fa-solid fa-earth-americas"></i>
            </router-link>
          </div>
          <div class="navbar__navegation--link">
            <div @click="bookMenuDisplay()" class="link router-link" to="/book">
              Book
            </div>
            <div
              @click="tripsMenuDisplay()"
              class="link router-link"
              to="/trips"
            >
              My trips
            </div>
            <div
              @click="experienceMenuDisplay()"
              class="link router-link"
              to="/check-in"
            >
              Experience
            </div>
            <router-link @click="reload()" class="link router-link" to="/help"
              >Help Center</router-link
            >
          </div>
        </div>
        <div class="navbar__settings">
          <div>
            <form>
              <input
                class="search__input"
                type="text"
                placeholder="keyword search"
              />
              <button>
                <i class="fa-solid fa-magnifying-glass setting--icon"></i>
              </button>
            </form>
          </div>
          <div>
            <i class="fa-solid fa-earth-americas setting--icon"></i>
          </div>
          <div>
            <i class="fa-solid fa-circle-half-stroke setting--icon"></i>
          </div>
          <div>
            <i class="fa-solid fa-user setting--icon"></i>
          </div>
        </div>
      </div>
    </div>

    <div class="sub-nav">
      <!-- booking -->
      <div id="bookMenu" class="sub-nav__container sub-nav--display">
        <div class="pin pin-book"></div>
        <div class="sub-nav__container--box">
          <h2>Plan your next flights</h2>
          <nav>
            <router-link class="sub-nav--link" to="/about"
              >Schedule</router-link
            >
            <router-link class="sub-nav--link" to="/"
              >Special offers</router-link
            >
            <router-link class="sub-nav--link" to="/"
              >Special family trip</router-link
            >
          </nav>
        </div>
        <div class="sub-nav__container--box">
          <h2>Explore world</h2>
          <nav>
            <router-link class="sub-nav--link" to="/">Europe</router-link>
            <router-link class="sub-nav--link" to="/">America</router-link>
            <router-link class="sub-nav--link" to="/">Africa</router-link>
            <router-link class="sub-nav--link" to="/">Asia</router-link>
            <router-link class="sub-nav--link" to="/">Oceania</router-link>
          </nav>
        </div>
        <div class="sub-nav__container--box">
          <h2>Travel services</h2>
          <nav>
            <router-link class="sub-nav--link" to="/">Rent a car</router-link>
            <router-link class="sub-nav--link" to="/">Hotel</router-link>
            <router-link class="sub-nav--link" to="/">Restorant</router-link>
          </nav>
        </div>
      </div>

      <!-- trips -->
      <div id="tripsMenu" class="sub-nav__container sub-nav--display">
        <div class="pin pin-trips"></div>
        <div class="sub-nav__container--box">
          <h2>Manage your trips</h2>
          <nav>
            <router-link class="sub-nav--link" to="/">Check in</router-link>
            <router-link class="sub-nav--link" to="/"
              >Choose your seat</router-link
            >
            <router-link class="sub-nav--link" to="/"
              >Upgrade your flight</router-link
            >
            <router-link class="sub-nav--link" to="/"
              >Groups settings</router-link
            >
            <router-link class="sub-nav--link" to="/"
              >Manage your baggage</router-link
            >
            <router-link class="sub-nav--link" to="/"
              >Manage your pets</router-link
            >
          </nav>
        </div>
        <div class="sub-nav__container--box">
          <h2>Airport assistance</h2>
          <nav>
            <router-link class="sub-nav--link" to="/"
              >Language guide</router-link
            >
            <router-link class="sub-nav--link" to="/">Delivery</router-link>
            <router-link class="sub-nav--link" to="/"
              >Medical assistance</router-link
            >
          </nav>
        </div>
        <div class="sub-nav__container--box">
          <h2>Flight</h2>
          <nav>
            <router-link class="sub-nav--link" to="/">Status</router-link>
            <router-link class="sub-nav--link" to="/"
              >Meet your plane</router-link
            >
          </nav>
        </div>
      </div>

      <!-- Experience -->
      <div id="experienceMenu" class="sub-nav__container sub-nav--display">
        <div class="pin pin-experience"></div>
        <div class="sub-nav__container--box">
          <h2>Hotels</h2>
          <nav>
            <router-link class="sub-nav--link" to="/">Schedule</router-link>
            <router-link class="sub-nav--link" to="/"
              >Offers by location</router-link
            >
          </nav>
        </div>
        <div class="sub-nav__container--box">
          <h2>Cars</h2>
          <nav>
            <router-link class="sub-nav--link" to="/">Rent</router-link>
          </nav>
        </div>
        <div class="sub-nav__container--box">
          <h2>Restorants</h2>
          <nav>
            <router-link class="sub-nav--link" to="/">Reserve</router-link>
          </nav>
        </div>
        <div class="sub-nav__container--box">
          <h2>Explore</h2>
          <nav>
            <router-link class="sub-nav--link" to="/">Resorts</router-link>
            <router-link class="sub-nav--link" to="/">Beach</router-link>
            <router-link class="sub-nav--link" to="/"
              >Nearly events schedule</router-link
            >
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      arr: [this.bookMenu, this.tripsMenu, this.experienceMenu],
      bookMenu: document.querySelector("#bookMenu"),
      tripsMenu: document.querySelector("#tripsMenu"),
      experienceMenu: document.querySelector("#experienceMenu"),
    };
  },
  methods: {
    reload() {
      location.reload();
    },
    bookMenuDisplay() {
      tripsMenu.classList.add("sub-nav--display");
      experienceMenu.classList.add("sub-nav--display");

      bookMenu.classList.toggle("sub-nav--display");

      bookMenu.onmouseout = () => {
        bookMenu.classList.toggle("sub-nav--display");
      };
    },
    tripsMenuDisplay() {
      bookMenu.classList.add("sub-nav--display");
      experienceMenu.classList.add("sub-nav--display");

      tripsMenu.classList.toggle("sub-nav--display");

      tripsMenu.onmouseout = () => {
        tripsMenu.classList.toggle("sub-nav--display");
      };
    },
    experienceMenuDisplay() {
      tripsMenu.classList.add("sub-nav--display");
      bookMenu.classList.add("sub-nav--display");

      experienceMenu.classList.toggle("sub-nav--display");

      experienceMenu.onmouseout = () => {
        experienceMenu.classList.toggle("sub-nav--display");
      };
    },
  },
};
</script>
