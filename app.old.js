// Initialize Lucide Icons
lucide.createIcons();

let historyStack = ['screen-welcome'];

// User Session State
let currentUser = null; // e.g. { name: "Rahul", phone: "9876543210" }

function requireLogin(actionDesc) {
    if (!currentUser) {
        alert(`Please login first to ${actionDesc}. (ഈ സേവനം ഉപയോഗിക്കാൻ ദയവായി ലോഗിൻ ചെയ്യുക)`);
        navigate('screen-login');
        return false;
    }
    return true;
}

function navigate(targetId, backward = false) {
    const screens = document.querySelectorAll('.screen');
    const targetScreen = document.getElementById(targetId);

    if (!targetScreen) return;

    // Find current active screen
    const currentScreen = document.querySelector('.screen.active');

    // If not backward, add to history stack
    if (!backward && currentScreen && currentScreen.id !== targetId) {
        historyStack.push(targetId);
    }

    // Hide all screens
    screens.forEach(screen => {
        if (screen.id !== targetId && screen.classList.contains('active')) {
            screen.classList.remove('active');
            if (!backward) {
                // Exit left
                screen.classList.add('exit');
            }
        } else {
            screen.classList.remove('exit');
        }
    });

    // Show target screen
    targetScreen.classList.add('active');
    targetScreen.classList.remove('exit');

    // Re-render lucide icons if there are new ones created dynamically
    lucide.createIcons();

    if (targetId === 'screen-bloodbank') {
        renderDonors();
        renderDonorDashboard();
    }
}

// Handle global back gestures (Mock)
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && historyStack.length > 1) {
        goBack();
    }
});

function goBack() {
    if (historyStack.length > 1) {
        historyStack.pop(); // Remove current
        const previousId = historyStack[historyStack.length - 1];
        navigate(previousId, true);
    }
}

// Login Logic Mockup
function login() {
    const inputs = document.querySelectorAll('#login-form input, #login-form select');
    let valid = true;
    let name = "";
    let phone = "";

    inputs.forEach((i, index) => {
        if (!i.value) valid = false;
        if (index === 0) name = i.value;
        if (index === 1) phone = i.value;
    });

    if (valid) {
        currentUser = { name, phone };

        // Update Drawer
        const drawerName = document.getElementById('drawer-user-name');
        const drawerPhone = document.getElementById('drawer-user-phone');
        if (drawerName) drawerName.innerText = name;
        if (drawerPhone) drawerPhone.innerText = phone;

        alert("Login Successful! Welcome to Ward 18.");
        // Clear inputs
        inputs.forEach(i => i.value = '');
        navigate('screen-home');
    } else {
        alert("Please fill in all details");
    }
}

function logout() {
    currentUser = null;

    // Reset Drawer
    const drawerName = document.getElementById('drawer-user-name');
    const drawerPhone = document.getElementById('drawer-user-phone');
    if (drawerName) drawerName.innerText = "Guest User";
    if (drawerPhone) drawerPhone.innerText = "Ward 18";

    toggleDrawer();
    navigate('screen-welcome');
}

// Navigation Drawer Logic
function toggleDrawer() {
    const drawer = document.getElementById('nav-drawer');
    if (drawer.classList.contains('hidden')) {
        drawer.classList.remove('hidden');
        // Small delay to allow display:block to apply before animating opacity
        setTimeout(() => {
            drawer.classList.add('visible');
        }, 10);
    } else {
        drawer.classList.remove('visible');
        setTimeout(() => {
            drawer.classList.add('hidden');
        }, 300); // Matches transition duration
    }
}

// Initialize the first screen specifically
document.addEventListener("DOMContentLoaded", () => {
    // Hide all initially except welcome 
    // Already handled via CSS, but good to enforce.
    const container = document.getElementById('app');
    container.style.opacity = '1';
});

// --- Blood Bank Advanced Logic ---
let mockDonors = [
    { id: 1, name: "Rahul K", group: "O+", location: "Panayi Center", lastDonation: null }, // Logged in profile mock
    { id: 2, name: "Akhil M", group: "A-", location: "Temple Road", lastDonation: new Date(Date.now() - 100 * 24 * 60 * 60 * 1000).toISOString() }, // 100 days ago (eligible)
    { id: 3, name: "Sreejith P", group: "B+", location: "School Junction", lastDonation: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString() }, // 20 days ago (ineligible)
    { id: 4, name: "Vishnu T", group: "O+", location: "River Side", lastDonation: null },
    { id: 5, name: "Anand S", group: "AB+", location: "Panayi Center", lastDonation: null }
];

const loggedInDonorId = 1; // Assuming Rahul K is the logged in user

function switchBloodBankTab(tabName) {
    const tabs = document.querySelectorAll('.tabs-container .tab');
    const views = document.querySelectorAll('.bb-view');

    tabs.forEach(t => t.classList.remove('active'));
    views.forEach(v => v.style.display = 'none');

    if (tabName === 'find') {
        tabs[0].classList.add('active');
        document.getElementById('bb-view-find').style.display = 'block';
        renderDonors();
    } else {
        if (!requireLogin("access your Donor Dashboard")) return;
        tabs[1].classList.add('active');
        document.getElementById('bb-view-dashboard').style.display = 'block';
        renderDonorDashboard();
    }
}

function isEligible(lastDonationStr) {
    if (!lastDonationStr) return true;
    const lastDonation = new Date(lastDonationStr);
    const now = new Date();
    const diffTime = now - lastDonation;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 90;
}

function renderDonors() {
    const filter = document.getElementById('blood-group-filter').value;
    const container = document.getElementById('donor-list-container');
    container.innerHTML = '';

    const eligibleDonors = mockDonors.filter(d => {
        const matchesGroup = filter === 'All' || d.group === filter;
        const eligible = isEligible(d.lastDonation);

        // Hide self from the "Find a Donor" dashboard if you want, but for now we just show.
        // Or if the logged in user is ineligible, they still shouldn't show up.
        return matchesGroup && eligible;
    });

    if (eligibleDonors.length === 0) {
        container.innerHTML = '<div class="card mt-4 text-center"><p class="text-muted" style="padding:16px;">No eligible donors found for this blood group at the moment.</p></div>';
        return;
    }

    eligibleDonors.forEach(d => {
        container.innerHTML += `
            <div class="donor-card card mt-2" style="margin-bottom:8px;">
                <div class="donor-info">
                    <div class="blood-group">${d.group}</div>
                    <div class="details">
                        <h4>${d.name}</h4>
                        <span style="display:block; margin-top:4px;">${d.location}</span>
                        <span class="badge blue" style="margin-top:4px; display:inline-block;">Available Now</span>
                    </div>
                </div>
                <button class="icon-btn call-btn" style="width:48px;height:48px;"><i data-lucide="phone"></i></button>
            </div>
        `;
    });
    lucide.createIcons();
}

function renderDonorDashboard() {
    if (!currentUser) return; // Should be handled by tab switch, but safe-guard
    const myProfile = mockDonors.find(d => d.id === loggedInDonorId);
    const statusBox = document.getElementById('donor-status-box');
    const btnDonate = document.getElementById('btn-donate-today');

    if (isEligible(myProfile.lastDonation)) {
        statusBox.className = 'status-box status-eligible';
        statusBox.innerHTML = '<i data-lucide="check-circle" style="width:24px;height:24px;"></i> <span>You are currently eligible to donate blood.</span>';
        btnDonate.style.display = 'flex';
    } else {
        const lastDonationDate = new Date(myProfile.lastDonation);
        const nextEligibleDate = new Date(lastDonationDate.getTime() + 90 * 24 * 60 * 60 * 1000);

        statusBox.className = 'status-box status-cooldown';
        statusBox.innerHTML = `<i data-lucide="clock" style="width:24px;height:24px;"></i> <span>You are in the 3-month cooldown period.<br>Next eligibility: ${nextEligibleDate.toLocaleDateString()}</span>`;
        btnDonate.style.display = 'none'; // Hide button if already in cooldown
    }
    lucide.createIcons();
}

function markDonatedToday() {
    if (!requireLogin("mark your donation status")) return;
    if (confirm("Are you sure you want to mark that you donated blood today? Your profile will be hidden from the public search for 90 days.")) {
        const myProfile = mockDonors.find(d => d.id === loggedInDonorId);
        myProfile.lastDonation = new Date().toISOString();
        alert("Status updated! Thank you for your donation. You are now in a 3-month cooldown period.");
        renderDonorDashboard(); // Refresh dashboard
        // Optionally switch back to find tab or just keep them here
    }
}

// --- Marketplace Multi-Vendor Logic ---

// State
let myVendorStatus = 'unregistered'; // 'unregistered', 'pending', 'approved'
let myShopName = "";

let marketplaceProducts = [
    { id: 101, name: "കറിപ്പൊടികൾ (Curry Powders)", price: "₹150 / പാക്കറ്റ്", shop: "Kudumbashree Unit 1", phone: "9876543210", img: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=300&fit=crop" },
    { id: 102, name: "വെളിച്ചെണ്ണ (Coconut Oil)", price: "₹250 / ലിറ്റർ", shop: "Kudumbashree Unit 1", phone: "9876543210", img: "https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?w=400&h=300&fit=crop" },
    { id: 103, name: "കൈത്തറി മുണ്ട് (Handloom Mundu)", price: "₹450 / എണ്ണം", shop: "Panayi Weavers", phone: "9988776655", img: "https://images.unsplash.com/photo-1605000523097-f55a1e20436d?w=400&h=300&fit=crop" }
];

function switchMarketTab(tabName) {
    const tabs = document.querySelectorAll('.tabs-container .mkt-tab');
    const views = document.querySelectorAll('.mkt-view');

    tabs.forEach(t => t.classList.remove('active'));
    views.forEach(v => v.style.display = 'none');

    if (tabName === 'shop') {
        tabs[0].classList.add('active');
        document.getElementById('mkt-view-shop').style.display = 'block';
        renderShopMarketplace();
    } else {
        if (!requireLogin("access the Vendor Dashboard")) return;
        tabs[1].classList.add('active');
        document.getElementById('mkt-view-vendor').style.display = 'block';
        renderVendorDashboard();
    }
}

function renderShopMarketplace() {
    const container = document.getElementById('market-products-container');
    container.innerHTML = '';

    // Group products by Shop
    const shopGroups = {};
    marketplaceProducts.forEach(p => {
        if (!shopGroups[p.shop]) shopGroups[p.shop] = [];
        shopGroups[p.shop].push(p);
    });

    for (const shopName in shopGroups) {
        container.innerHTML += `<h3 class="mt-4 mb-2 text-blue"><i data-lucide="store" style="width:18px;height:18px;margin-bottom:-3px;"></i> ${shopName}</h3>`;
        let productsHTML = '<div class="market-grid">';

        shopGroups[shopName].forEach(p => {
            productsHTML += `
                <div class="product-card card">
                    <div class="product-img" style="background-image: url('${p.img}'); background-size: cover; background-position: center;"></div>
                    <h4 style="margin-bottom:4px;">${p.name}</h4>
                    <p class="text-blue" style="font-weight:600; margin-bottom:4px;">${p.price}</p>
                    <button class="btn-whatsapp w-full mt-2" onclick="window.open('https://wa.me/91${p.phone}?text=Hi, I want to buy ${p.name}', '_blank')">
                        <i data-lucide="message-circle"></i> Contact Vendor
                    </button>
                </div>
            `;
        });

        productsHTML += '</div>';
        container.innerHTML += productsHTML;
    }
    lucide.createIcons();
}

function renderVendorDashboard() {
    if (!currentUser) return;
    document.getElementById('vendor-registration-card').style.display = 'none';
    document.getElementById('vendor-pending-card').style.display = 'none';
    document.getElementById('vendor-dashboard-card').style.display = 'none';

    if (myVendorStatus === 'unregistered') {
        document.getElementById('vendor-registration-card').style.display = 'block';
    } else if (myVendorStatus === 'pending') {
        document.getElementById('vendor-pending-card').style.display = 'block';
    } else if (myVendorStatus === 'approved') {
        document.getElementById('vendor-dashboard-card').style.display = 'block';
        document.getElementById('my-shop-name').innerText = myShopName;
        renderMyProducts();
    }
}

function registerVendor() {
    const shop = prompt("Enter your Shop/Unit Name:");
    if (shop) {
        myShopName = shop;
        myVendorStatus = 'pending';
        alert("Registration submitted! Waiting for admin approval.");
        renderVendorDashboard();

        // Update Admin Badge
        const adminBadge = document.getElementById('admin-vendor-count');
        if (adminBadge) adminBadge.innerText = '1';
    }
}

function adminApproveVendor() {
    if (myVendorStatus === 'pending') {
        if (confirm(`Approve registration for shop: ${myShopName}?`)) {
            myVendorStatus = 'approved';
            alert(`${myShopName} has been approved as a vendor.`);
            const adminBadge = document.getElementById('admin-vendor-count');
            if (adminBadge) adminBadge.innerText = '0';
        }
    } else {
        alert("No pending vendor registrations.");
    }
}

// Product Management
function showAddProductModal() {
    document.getElementById('modal-add-product').classList.remove('hidden');
    document.getElementById('modal-add-product').classList.add('visible');
}

function hideAddProductModal() {
    document.getElementById('modal-add-product').classList.remove('visible');
    document.getElementById('modal-add-product').classList.add('hidden');
    document.getElementById('form-add-product').reset();
}

function submitAddProduct() {
    const name = document.getElementById('add-prod-name').value;
    const price = document.getElementById('add-prod-price').value;
    let img = document.getElementById('add-prod-img').value;

    if (!img) img = "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=300&fit=crop"; // Placeholder

    const newProduct = {
        id: Date.now(),
        name: name,
        price: price,
        shop: myShopName,
        phone: currentUser ? currentUser.phone : "9876543210",
        img: img
    };

    marketplaceProducts.unshift(newProduct); // Add to top
    hideAddProductModal();
    renderMyProducts();
    alert("Product added successfully!");
}

function deleteProduct(id) {
    if (confirm("Are you sure you want to delete this product?")) {
        marketplaceProducts = marketplaceProducts.filter(p => p.id !== id);
        renderMyProducts();
    }
}

function editProduct(id) {
    alert("Edit form mock - Normally this opens a pre-filled modal.");
}

function renderMyProducts() {
    const container = document.getElementById('vendor-my-products-container');
    container.innerHTML = '';

    const myProducts = marketplaceProducts.filter(p => p.shop === myShopName);

    if (myProducts.length === 0) {
        container.innerHTML = '<div style="grid-column: 1 / -1; text-align:center; padding: 24px; color: var(--text-muted);">You haven\'t added any products yet.</div>';
        return;
    }

    myProducts.forEach(p => {
        container.innerHTML += `
            <div class="product-card card">
                <div class="product-img" style="background-image: url('${p.img}'); background-size: cover; background-position: center;"></div>
                <h4 style="margin-bottom:4px;">${p.name}</h4>
                <p class="text-blue" style="font-weight:600; margin-bottom:12px;">${p.price}</p>
                <div class="flex-between">
                    <button class="btn-outline-sm" style="flex:1; margin-right:8px;" onclick="editProduct(${p.id})"><i data-lucide="edit-2" style="width:14px;height:14px;margin-bottom:-2px;"></i> Edit</button>
                    <button class="icon-btn" style="color:var(--primary-red);" onclick="deleteProduct(${p.id})"><i data-lucide="trash-2"></i></button>
                </div>
            </div>
        `;
    });
    lucide.createIcons();
}

// Intercept navigate to load correct default market tabs
const originalNavigate = navigate;
navigate = function (targetId, backward = false) {
    const res = originalNavigate(targetId, backward);
    if (targetId === 'screen-market') {
        switchMarketTab('shop');
    } else if (targetId === 'screen-jobs') {
        showJobCategories();
    }
    return res;
}

// --- Jobs Directory Logic ---

const jobCategories = [
    { id: 'electrician', title: "Electricians (ഇലക്ട്രീഷ്യൻ)", icon: "zap", color: "blue" },
    { id: 'plumber', title: "Plumbers (പ്ലംബർ)", icon: "droplet", color: "green" },
    { id: 'driver', title: "Drivers (ഡ്രൈവർ)", icon: "car", color: "orange" },
    { id: 'painter', title: "Painters (പെയ്ൻ്റർ)", icon: "brush", color: "red" }
];

const jobWorkers = [
    { name: "Suresh P", category: "electrician", exp: "5 Yrs Exp", location: "Temple Road", phone: "9876543210" },
    { name: "Akhil M", category: "electrician", exp: "2 Yrs Exp", location: "Panayi Center", phone: "9876543210" },
    { name: "Manish V", category: "plumber", exp: "8 Yrs Exp", location: "Temple Road", phone: "9876543210" },
    { name: "Rahul K", category: "driver", exp: "Taxi / Auto", location: "River Side", phone: "9876543210" },
    { name: "Gopi S", category: "painter", exp: "House Painting", location: "School Junction", phone: "9876543210" }
];

function showJobCategories() {
    document.getElementById('jobs-view-workers').style.display = 'none';
    document.getElementById('jobs-view-categories').style.display = 'block';

    const container = document.getElementById('jobs-category-grid');
    container.innerHTML = '';

    jobCategories.forEach(cat => {
        container.innerHTML += `
            <div class="service-item card" onclick="showJobWorkersForCategory('${cat.id}')">
                <div class="icon-wrapper ${cat.color}"><i data-lucide="${cat.icon}"></i></div>
                <span>${cat.title}</span>
            </div>
        `;
    });
    lucide.createIcons();
}

function showJobWorkersForCategory(categoryId) {
    document.getElementById('jobs-view-categories').style.display = 'none';
    document.getElementById('jobs-view-workers').style.display = 'block';

    const category = jobCategories.find(c => c.id === categoryId);
    document.getElementById('jobs-selected-category-title').innerHTML = `<i data-lucide="${category.icon}" style="width:20px;height:20px;margin-bottom:-4px;"></i> ${category.title}`;

    const container = document.getElementById('jobs-workers-container');
    container.innerHTML = '';

    const workers = jobWorkers.filter(w => w.category === categoryId);

    if (workers.length === 0) {
        container.innerHTML = '<p class="text-muted text-center p-4">No workers registered in this category yet.</p>';
        return;
    }

    workers.forEach(w => {
        container.innerHTML += `
            <div class="donor-card card mb-2" style="margin-bottom:8px;">
                <div class="donor-info">
                    <div class="icon-wrapper ${category.color}"><i data-lucide="${category.icon}"></i></div>
                    <div class="details">
                        <h4>${w.name}</h4>
                        <span>${w.exp} • ${w.location}</span>
                    </div>
                </div>
                <button class="icon-btn call-btn" onclick="window.location.href='tel:+91${w.phone}'"><i data-lucide="phone"></i></button>
            </div>
        `;
    });
    lucide.createIcons();
}

// --- Image Slider Logic ---

let currentSlideIndex = 0;
let sliderInterval;

function initSlider() {
    const track = document.getElementById('slider-track');
    if (!track) return;
    const slides = track.querySelectorAll('.slide');
    if (slides.length === 0) return;

    // Start auto-play
    startSliderAutoPlay();

    // Touch events for swiping
    let startX = 0;
    let endX = 0;

    track.addEventListener('touchstart', e => {
        startX = e.changedTouches[0].screenX;
        clearInterval(sliderInterval); // Pause on touch
    }, { passive: true });

    track.addEventListener('touchend', e => {
        endX = e.changedTouches[0].screenX;
        handleSwipe();
        startSliderAutoPlay(); // Resume
    }, { passive: true });

    function handleSwipe() {
        const threshold = 50;
        if (startX - endX > threshold) {
            moveSlider(1); // Swipe left, go next
        } else if (endX - startX > threshold) {
            moveSlider(-1); // Swipe right, go prev
        }
    }
}

function updateSlider() {
    const track = document.getElementById('slider-track');
    if (!track) return;
    const dots = document.querySelectorAll('.slider-dot');

    // Move track
    track.style.transform = `translateX(-${currentSlideIndex * 100}%)`;

    // Update dots
    dots.forEach((dot, index) => {
        if (index === currentSlideIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function moveSlider(direction) {
    const track = document.getElementById('slider-track');
    if (!track) return;
    const slides = track.querySelectorAll('.slide');

    currentSlideIndex += direction;

    // Loop around
    if (currentSlideIndex >= slides.length) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = slides.length - 1;
    }

    updateSlider();
    resetSliderAutoPlay(); // Reset timer on manual interaction
}

function goToSlide(index) {
    currentSlideIndex = index;
    updateSlider();
    resetSliderAutoPlay();
}

function startSliderAutoPlay() {
    sliderInterval = setInterval(() => {
        moveSlider(1);
    }, 4000); // 4 seconds
}

function resetSliderAutoPlay() {
    clearInterval(sliderInterval);
    startSliderAutoPlay();
}

// Initialize slider on load
document.addEventListener('DOMContentLoaded', initSlider);
