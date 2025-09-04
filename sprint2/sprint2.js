 
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
        name: "Akram Almassri",
        message: "See you later.",
        date: "Sep 11",
        avatar: "prof.png",
        chat: [
          { from: "Akram", text: "Are we still on for the meeting?" },
          { from: "user", text: "Yes, at 4 PM." },
          { from: "Akram", text: "Perfect!" }
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
        
   
        let isLiked = false;
        let likesCount = 2500;
        let currentImageId = '';

        // Announcement data
        const announcementData = {
            'image1': {
                title: 'Emergency Financial Aid for Affected Families in Northern Gaza',
                date: 'May 1, 2025',
                image: 'image (1).png',
                content: `
                    <p>The Ministry of Social Development announces the launch of a financial assistance program for families affected by the recent escalation in the northern areas of Gaza.</p>
                    <p>Eligible families can now apply for emergency financial support starting from May 3rd to May 10th, 2025.</p>
                    <h4>Eligibility Criteria:</h4>
                    <ul>
                        <li>Registered in the Ministry's social support database</li>
                        <li>Family home was destroyed or damaged</li>
                        <li>Having children under 18 years old</li>
                    </ul>
                    <h4>How to Apply:</h4>
                    <p>Visit the Ministry's website or local office in your governorate. Bring:</p>
                    <ul>
                        <li>Proof of residence</li>
                        <li>Damage report if available</li>
                        <li>Children's birth certificates</li>
                    </ul>
                    </div>
                `
            },
            'image2': {
                title: 'Professional Training Program for Youth',
                date: 'April 28, 2025',
                image: 'image.png',
                content: `
                    <p>The Ministry of Labor announces the launch of a professional training program for young graduates.</p>
                    <p>The program aims to equip youth with advanced practical skills for entering the job market.</p>
                    <h4>Required Qualifications:</h4>
                    <ul>
                        <li>Age between 18-30 years</li>
                        <li>High school diploma or higher</li>
                        <li>Ability to dedicate time to the program</li>
                    </ul>
                   
                `
            },
            'image3': {
                title: 'University Scholarships for Outstanding Students',
                date: 'April 25, 2025',
                image: 'image (3).png',
                content: `
                    <p>The Ministry of Higher Education announces the availability of university scholarships for outstanding students.</p>
                    <p>Scholarships include full tuition coverage and monthly allowance.</p>
                    <h4>Application Requirements:</h4>
                    <ul>
                        <li>GPA not less than 85% in high school</li>
                        <li>Pass the admission exam</li>
                        <li>Personal interview</li>
                    </ul>
                    
                `
            },
            'image4': {
                title: 'Small Business Support Program',
                date: 'April 22, 2025',
                image: 'image (2).png',
                content: `
                    <p>The Ministry of Economy announces a support program for small and medium enterprises.</p>
                    <p>The program provides soft loans and training for business owners.</p>
                    <h4>Benefits:</h4>
                    <ul>
                        <li>Low-interest loans</li>
                        <li>Free business management training</li>
                        <li>Legal and financial consultations</li>
                    </ul>
                `
            },
            'image5': {
                title: 'Preventive Vaccination Campaign for Children',
                date: 'April 20, 2025',
                image: 'image (4).png',
                content: `
                    <p>The Ministry of Health announces the start of a preventive vaccination campaign for children.</p>
                    <p>The campaign targets children aged 6 months to 5 years.</p>
                    <h4>Vaccination Schedule:</h4>
                    <ul>
                        <li>Daily from 8 AM to 2 PM</li>
                        <li>At all health centers</li>
                        <li>Free for all children</li>
                    </ul>
                `
            },
            'image6': {
                title: 'Adult Literacy Program',
                date: 'April 18, 2025',
                image: 'image (5).png',
                content: `
                    <p>The Ministry of Education announces an adult literacy program.</p>
                    <p>The program aims to teach reading and writing to adults.</p>
                    <h4>Program Features:</h4>
                    <ul>
                        <li>Completely free</li>
                        <li>Flexible schedules</li>
                        <li>Certified diploma</li>
                    </ul>
                `
            },
            'image7': {
                title: 'Social Housing Initiative',
                date: 'April 15, 2025',
                image: 'image (6).png',
                content: `
                    <p>The Ministry of Housing announces a social housing initiative for needy families.</p>
                    <p>The initiative provides housing units at subsidized prices.</p>
                    <h4>Eligibility Conditions:</h4>
                    <ul>
                        <li>Not owning a housing unit</li>
                        <li>Monthly income less than 3000 shekels</li>
                        <li>Priority for large families</li>
                    </ul>
                `
            },
            'image8': {
                title: 'Government Employment Program',
                date: 'April 12, 2025',
                image: 'image (7).png',
                content: `
                    <p>The General Personnel Bureau announces the opening of government employment in ministries.</p>
                    <p>Jobs are available in various specializations and levels.</p>
                    <h4>Application Process:</h4>
                    <ul>
                        <li>Online application only</li>
                        <li>Submit required documents</li>
                        <li>Pass the competitive exam</li>
                    </ul>
                `
            },
            'image9': {
                title: 'Sustainable Development Conference',
                date: 'April 10, 2025',
                image: 'image (8).png',
                content: `
                    <p>The Ministry of Planning announces the organization of a sustainable development conference.</p>
                    <p>The conference discusses development plans for the coming years.</p>
                    <h4>Conference Topics:</h4>
                    <ul>
                        <li>Economic development</li>
                        <li>Environmental development</li>
                        <li>Social development</li>
                    </ul>
                `
            }
        };

        function openPopup(imageId) {
            currentImageId = imageId;
            const data = announcementData[imageId];
            
            if (data) {
                // Update popup content
                document.querySelector('.popup-image').src = data.image;
                document.querySelector('.post-title').textContent = data.title;
                document.querySelector('.post-date').textContent = data.date;
                document.querySelector('.post-content').innerHTML = data.content;
                
                // Show popup
                document.getElementById('popupOverlay').style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        }

        function closePopup(event) {
            if (event && event.target !== event.currentTarget) return;
            document.getElementById('popupOverlay').style.display = 'none';
            document.body.style.overflow = 'auto';
        }

        function toggleLike() {
            const likeBtn = document.getElementById('likeBtn');
            isLiked = !isLiked;
            
            if (isLiked) {
                likeBtn.classList.add('liked');
                likesCount++;
            } else {
                likeBtn.classList.remove('liked');
                likesCount--;
            }
            
            updateLikesDisplay();
        }

        function updateLikesDisplay() {
            const likesElement = document.querySelector('.stats span:first-child');
            likesElement.textContent = `👍 ${likesCount}`;
        }

        function focusComment() {
            document.getElementById('commentInput').focus();
        }

        function sharePost() {
            if (navigator.share) {
                navigator.share({
                    title: 'Emergency Financial Aid for Affected Families in Northern Gaza',
                    text: 'The Ministry of Social Development announces the launch of a financial assistance program',
                    url: window.location.href
                });
            } else {
                // Copy link to clipboard
                navigator.clipboard.writeText(window.location.href).then(() => {
                    alert('Link copied to clipboard');
                });
            }
        }

        function showLikes() {
            alert(`${likesCount} people liked this post`);
        }

        function showComments() {
            alert('2600 comments on this post');
        }

        function showShares() {
            alert('2300 shares of this post');
        }

        // Close popup with Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                closePopup();
            }
        });

        // Handle comment input
        document.getElementById('commentInput').addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                const comment = this.value.trim();
                if (comment) {
                    alert(`Comment added: "${comment}"`);
                    this.value = '';
                }
            }
        });
   
 

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
  
   
  
    