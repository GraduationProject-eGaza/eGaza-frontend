 
    const messagesData = [
      {
        id: "1",
        name: "Tarek Mohamed",
        message: "Hello!",
        date: "Sep 12",
        avatar: "photo.png",
        chat: [
          { from: "user", text: "Hi Tarek!" },
          { from: "Tarek", text: "Hello! How are you?" },
          { from: "user", text: "I’m good, thanks!" }
        ]
      },
      {
        id: "2",
        name: "Aya Almassri",
        message: "See you later.",
        date: "Sep 11",
        avatar: "photo.png",
        chat: [
          { from: "Aya", text: "Are we still on for the meeting?" },
          { from: "user", text: "Yes, at 4 PM." },
          { from: "Aya", text: "Perfect!" }
        ]
      },
      {
        id: "3",
        name: "Tarek Mohamed",
        message: "Hello!",
        date: "Sep 12",
        avatar: "photo.png",
        chat: [
          { from: "user", text: "Hi Tarek!" },
          { from: "Tarek", text: "Hello! How are you?" },
          { from: "user", text: "I’m good, thanks!" }
        ] 
      },
      {
         id: "4",
        name: "Tarek Mohamed",
        message: "Hello!",
        date: "Sep 12",
        avatar: "photo.png",
        chat: [
          { from: "user", text: "Hi Tarek!" },
          { from: "Tarek", text: "Hello! How are you?" },
          { from: "user", text: "I’m good, thanks!" }
        ],
      }
    ];


    let currentUser = null;


    const messagesContainer = document.getElementById("messagesContainer");
    const messageListView = document.getElementById("messageListView");
    const chatView = document.getElementById("chatView");
    const chatHeader = document.getElementById("chatHeader");
    const chatMessages = document.getElementById("chatMessages");
    const searchInput = document.getElementById("searchInput");
    const backButton = document.getElementById("backButton");
    const messageInput = document.getElementById("messageInput");


    function renderMessages(filteredMessages = messagesData) {
      messagesContainer.innerHTML = filteredMessages.map(msg => `
        <div class="message-item" onclick="openChat('${msg.id}')">
          <img src="${msg.avatar}" alt="Avatar" width="35px">
          <div class="message-info">
            <div class="message-name">${msg.name}</div>
            <div class="message-snippet">${msg.message}</div>
          </div>
          <div class="message-date">${msg.date}</div>
        </div>
      `).join('');
    }


    function openChat(userId) {
      currentUser = messagesData.find(m => m.id === userId);
      if (!currentUser) return;


      messageListView.style.display = "none";
      chatView.style.display = "block";
      backButton.classList.remove("d-none");


      // صورة المستخدم تكون رابط للملف الشخصي
      chatHeader.innerHTML = `
        <a href="profile.html?id=${currentUser.id}" title="View Profile">
          <img src="${currentUser.avatar}" alt="Avatar" />
        </a>
        <strong>${currentUser.name}</strong>
      `;


      renderChatMessages();
    }


    function renderChatMessages() {
      chatMessages.innerHTML = currentUser.chat.map(c => `
        <div class="chat-message ${c.from === 'user' ? 'ms-auto bg-light' : 'bg-primary text-white'}">
          ${c.text}
        </div>
      `).join('');
    }


    function sendMessage() {
      const text = messageInput.value.trim();
      if (!text) return;


      currentUser.chat.push({ from: "user", text });
      messageInput.value = '';
      renderChatMessages();
    }


    function goBack() {
      chatView.style.display = "none";
      messageListView.style.display = "block";
      backButton.classList.add("d-none");
    }


    searchInput.addEventListener('input', () => {
      const term = searchInput.value.toLowerCase();
      const filtered = messagesData.filter(m =>
        m.name.toLowerCase().includes(term) || m.message.toLowerCase().includes(term)
      );
      renderMessages(filtered);
    });


    renderMessages();
 
        let isEditing = false;
        let editingServiceId = null;
        let serviceCounter = 6;

        // Sample services data
        let services = [
            { id: 1, name: "Emergency Shelter Assistance", requests: 15, employees: ["John Doe", "Jane Smith", "Mike Johnson"] },
            { id: 2, name: "Food Parcel Distribution", requests: 25, employees: ["Sarah Wilson", "David Brown"] },
            { id: 3, name: "Student Tuition Support", requests: 100, employees: ["Lisa Davis"] },
            { id: 4, name: "Disaster Sponsorship Enrollment", requests: 14, employees: ["Mike Johnson", "John Doe"] },
            { id: 5, name: "Disability Support Services", requests: 30, employees: ["David Brown", "Jane Smith", "Sarah Wilson", "Lisa Davis"] }
        ];

        // Modal functions
        function openAddModal() {
            isEditing = false;
            document.getElementById('modalTitle').textContent = 'Add New Service';
            document.getElementById('submitBtn').textContent = 'Add Service';
            document.getElementById('serviceForm').reset();
            clearEmployeeSelection();
            document.getElementById('serviceModal').classList.add('active');
        }

        function closeModal() {
            document.getElementById('serviceModal').classList.remove('active');
            setTimeout(() => {
                document.getElementById('serviceForm').reset();
                clearEmployeeSelection();
            }, 300);
        }

        function editService(serviceId) {
            isEditing = true;
            editingServiceId = serviceId;
            const service = services.find(s => s.id === serviceId);
            
            if (service) {
                document.getElementById('modalTitle').textContent = 'Edit Service';
                document.getElementById('submitBtn').textContent = 'Update Service';
                document.getElementById('serviceName').value = service.name;
                document.getElementById('serviceDescription').value = service.description || '';
                
                // Select assigned employees
                clearEmployeeSelection();
                service.employees.forEach(employeeName => {
                    const chip = document.querySelector(`[data-employee="${employeeName}"]`);
                    if (chip) {
                        chip.classList.add('selected');
                    }
                });
                
                document.getElementById('serviceModal').classList.add('active');
            }
        }

        function deleteService(serviceId) {
            // Prevent any default behavior
            event.preventDefault();
            event.stopPropagation();
            
            if (confirm('Are you sure you want to delete this service from the table? This action cannot be undone.')) {
                // Find the service to show confirmation message
                const service = services.find(s => s.id === serviceId);
                
                if (service) {
                    // Remove the service from the LOCAL array only (not server)
                    services = services.filter(s => s.id !== serviceId);
                    
                    // Re-render the table immediately
                    renderServicesTable();
                    
                    // Show success message
                    console.log(`Service "${service.name}" removed from table.`);
                } else {
                    console.log('Service not found in local data.');
                }
            }
        }

        // Employee selection functions
        function clearEmployeeSelection() {
            document.querySelectorAll('.employee-chip').forEach(chip => {
                chip.classList.remove('selected');
            });
        }

        function getSelectedEmployees() {
            const selectedChips = document.querySelectorAll('.employee-chip.selected');
            return Array.from(selectedChips).map(chip => chip.dataset.employee);
        }

        // Form submission
        document.getElementById('serviceForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const serviceName = document.getElementById('serviceName').value.trim();
            const serviceDescription = document.getElementById('serviceDescription').value.trim();
            const selectedEmployees = getSelectedEmployees();
            
            if (!serviceName) {
                alert('Please enter a service name');
                return;
            }
            
            if (selectedEmployees.length === 0) {
                alert('Please assign at least one employee');
                return;
            }
            
            if (isEditing) {
                const serviceIndex = services.findIndex(s => s.id === editingServiceId);
                if (serviceIndex !== -1) {
                    services[serviceIndex] = {
                        ...services[serviceIndex],
                        name: serviceName,
                        description: serviceDescription,
                        employees: selectedEmployees
                    };
                }
            } else {
                const newService = {
                    id: serviceCounter++,
                    name: serviceName,
                    description: serviceDescription,
                    requests: 0,
                    employees: selectedEmployees
                };
                services.push(newService);
            }
            
            renderServicesTable();
            closeModal();
        });

        // Employee chip selection
        document.addEventListener('click', function(e) {
            if (e.target.closest('.employee-chip')) {
                const chip = e.target.closest('.employee-chip');
                chip.classList.toggle('selected');
            }
        });

        // Employee search functionality
        document.getElementById('employeeSearch').addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const chips = document.querySelectorAll('.employee-chip');
            
            chips.forEach(chip => {
                const employeeName = chip.dataset.employee.toLowerCase();
                if (employeeName.includes(searchTerm)) {
                    chip.style.display = 'flex';
                } else {
                    chip.style.display = 'none';
                }
            });
        });

        // Render services table
        function renderServicesTable() {
            const tbody = document.getElementById('servicesTableBody');
            tbody.innerHTML = '';
            
            services.forEach((service, index) => {
                const row = document.createElement('tr');
                
                // Generate avatar colors for employees
                const avatarColors = ['red', 'green', 'blue', 'orange', 'purple', 'teal'];
                const employeeAvatars = service.employees.map((employee, i) => 
                    `<div class="avatar ${avatarColors[i % avatarColors.length]}"></div>`
                ).join('');
                
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${service.name}</td>
                    <td>${service.requests}</td>
                    <td>
                        <div class="employee-avatars">
                            ${employeeAvatars}
                        </div>
                    </td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn btn-edit" type="button" onclick="editService(${service.id}); return false;">Edit</button>
                            <button class="btn btn-delete" type="button" onclick="deleteService(${service.id}); return false;">Delete</button>
                        </div>
                    </td>
                `;
                
                tbody.appendChild(row);
            });
        }

        // Close modal when clicking outside
        document.getElementById('serviceModal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && document.getElementById('serviceModal').classList.contains('active')) {
                closeModal();
            }
        });

        // Initialize the table
        renderServicesTable();
 
   
 
    payButtons.forEach(button => {
      button.addEventListener("click", function () {
        const row = this.closest("tr");
        selectedBillId = row.cells[1].textContent;
        const billType = row.cells[2].textContent;
        const amount = row.cells[4].textContent;
        document.getElementById("billInfo").textContent = `${selectedBillId} - ${billType} - $${amount}`;
        const modal = new bootstrap.Modal(document.getElementById("confirmModal"));
        modal.show();
      });
    });
 
    document.getElementById("confirmPayBtn").addEventListener("click", function () {
      // Simulate payment success
      if (selectedBillId) {
        const rows = document.querySelectorAll("table tbody tr");
        rows.forEach(row => {
          if (row.cells[1].textContent === selectedBillId) {
            row.cells[6].textContent = "Paid";
            row.cells[6].className = "status-paid";
            const btn = row.querySelector(".pay-btn");
            btn.classList.add("disabled");
            btn.disabled = true;
          }
        });
      }
      const modal = bootstrap.Modal.getInstance(document.getElementById("confirmModal"));
      modal.hide();
    });
 
    // Filter by status
    document.getElementById("statusFilter").addEventListener("change", function () {
      const filter = this.value;
      const rows = document.querySelectorAll("table tbody tr");
 
      rows.forEach(row => {
        const status = row.cells[6].textContent.trim();
        if (filter === "all" || status === filter) {
          row.style.display = "";
        } else {
          row.style.display = "none";
        }
      });
    });
  
    const payButtons = document.querySelectorAll(".pay-btn:not(.disabled)");
    let selectedBillId = null;
 
    payButtons.forEach(button => {
      button.addEventListener("click", function () {
        const row = this.closest("tr");
        selectedBillId = row.cells[1].textContent;
        const billType = row.cells[2].textContent;
        const amount = row.cells[4].textContent;
        document.getElementById("billInfo").textContent = `${selectedBillId} - ${billType} - $${amount}`;
        const modal = new bootstrap.Modal(document.getElementById("confirmModal"));
        modal.show();
      });
    });
 
    document.getElementById("confirmPayBtn").addEventListener("click", function () {
      // Simulate payment success
      if (selectedBillId) {
        const rows = document.querySelectorAll("table tbody tr");
        rows.forEach(row => {
          if (row.cells[1].textContent === selectedBillId) {
            row.cells[6].textContent = "Paid";
            row.cells[6].className = "status-paid";
            const btn = row.querySelector(".pay-btn");
            btn.classList.add("disabled");
            btn.disabled = true;
          }
        });
      }
      const modal = bootstrap.Modal.getInstance(document.getElementById("confirmModal"));
      modal.hide();
    });
 
    // Filter by status
    document.getElementById("statusFilter").addEventListener("change", function () {
      const filter = this.value;
      const rows = document.querySelectorAll("table tbody tr");
 
      rows.forEach(row => {
        const status = row.cells[6].textContent.trim();
        if (filter === "all" || status === filter) {
          row.style.display = "";
        } else {
          row.style.display = "none";
        }
      });
    });
  
          // Navigation functionality
        document.querySelectorAll('.nav-tabs li').forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs
                document.querySelectorAll('.nav-tabs li').forEach(t => t.classList.remove('active'));
                this.classList.add('active');
               
                // Get the tab name
                const tabName = this.getAttribute('data-tab');
               
                // Hide all content sections
                document.querySelector('.dashboard-content').classList.add('hidden');
                document.querySelector('.announcements-page').classList.remove('active');
               
                // Show the selected content
                if (tabName === 'dashboard') {
                    document.querySelector('.dashboard-content').classList.remove('hidden');
                } else if (tabName === 'announcements') {
                    document.querySelector('.announcements-page').classList.add('active');
                }
            });
        });


        // Search functionality
        document.querySelector('.search-bar input').addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            console.log('Searching for:', searchTerm);
        });


        // Edit profile functionality
        document.querySelector('.edit-btn').addEventListener('click', function() {
            alert('Edit profile functionality would be implemented here');
        });


        // Animate numbers on load
        function animateNumbers() {
            const numbers = document.querySelectorAll('.service-number, .bills-number, .stat-number, .number');
            numbers.forEach(num => {
                const target = parseInt(num.textContent);
                let current = 0;
                const increment = target / 30;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    num.textContent = Math.floor(current);
                }, 50);
            });
        }


        window.addEventListener('load', animateNumbers);
    
    function togglePopup(id) {
      document.querySelectorAll('.popup').forEach(p => {
        if (p.id !== id) p.style.display = 'none';
      });
      const popup = document.getElementById(id);
      popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
    }

    function showTab(index) {
      document.querySelectorAll('.tab-btn').forEach((btn, i) => {
        btn.classList.toggle('active', i === index);
      });
      document.querySelectorAll('.tab-content').forEach((tab, i) => {
        tab.classList.toggle('active', i === index);
      });
    }

    document.addEventListener('click', function (e) {
      const isIcon = e.target.closest('.icon-btn');
      const isPopup = e.target.closest('.popup');
      if (!isIcon && !isPopup) {
        document.querySelectorAll('.popup').forEach(p => p.style.display = 'none');
      }
    });
