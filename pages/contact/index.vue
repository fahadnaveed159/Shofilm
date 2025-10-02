    <style>
        body {
            box-sizing: border-box;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
        @media (max-width: 640px) {
            body {
                font-size: 14px;
            }
        }
        .gradient-text {
            background: linear-gradient(135deg, #ff6b6b, #4ecdc4, #45b7d1);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        .glass-effect {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .card-modern {
            transition: all 0.3s ease;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .card-modern:hover {
            transform: translateY(-5px) scale(1.02);
            box-shadow: 20px 20px 60px #0f172a, -20px -20px 60px #374151;
            border-color: rgba(139, 92, 246, 0.3);
        }
        @media (max-width: 640px) {
            .card-modern:hover {
                transform: translateY(-3px) scale(1.01);
                box-shadow: 10px 10px 30px #0f172a, -10px -10px 30px #374151;
            }
        }
      
        @keyframes floating {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
        }
        .fade-up {
            animation: fadeUp 0.8s ease-out;
        }
        @keyframes fadeUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .neon-glow {
            box-shadow: 0 0 20px rgba(139, 92, 246, 0.5);
        }
        .input-modern {
            background: rgba(255, 255, 255, 0.05);
            border: 2px solid rgba(255, 255, 255, 0.1);
            transition: all 0.3s ease;
        }
        .input-modern:focus {
            background: rgba(255, 255, 255, 0.1);
            border-color: #8b5cf6;
            box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
        }
        .pulse-ring {
            animation: pulse-ring 2s infinite;
        }
        @keyframes pulse-ring {
            0% { transform: scale(0.8); opacity: 1; }
            100% { transform: scale(2.4); opacity: 0; }
        }
        .chat-widget {
            position: fixed;
            bottom: 30px;
            right: 30px;
            z-index: 1000;
        }
    </style>


<template>
  <section class="relative flex items-center justify-center hero-bg min-h-[60vh] sm:min-h-96 fade-up">
    <div class="absolute inset-0 bg-black opacity-30"></div>
    <div class="container relative z-10 px-4 mx-auto text-center sm:px-6">
      <div class="max-w-4xl mx-auto">
        <h1 class="mb-4 text-4xl font-black sm:mb-6 sm:text-5xl md:text-6xl lg:text-7xl">
          <span class="text-white gradient-text"
            >Get In <span class="text-orange-500">Touch</span></span
          >
        </h1>
      </div>
      <p class="px-4 mb-6 text-lg text-gray-400 sm:mb-8 sm:text-xl md:text-2xl opacity-90 sm:px-0">
        We'd love to hear from you. Let's start a conversation.
      </p>
    </div>

    <!-- Floating Elements -->
    <div
      class="absolute w-16 h-16 bg-pink-500 rounded-full top-20 left-10 opacity-20 floating"
      style="animation-delay: -1s"
    ></div>
    <div
      class="absolute w-12 h-12 bg-blue-400 rounded-full bottom-20 right-16 opacity-30 floating"
      style="animation-delay: -2s"
    ></div>
    <div
      class="absolute w-8 h-8 bg-yellow-400 rounded-full opacity-25 top-1/2 left-20 floating"
      style="animation-delay: -0.5s"
    ></div>
  </section>

  <!-- Main Content -->
  <main class="py-12 sm:py-16 md:py-20 bg-gray-950">
    <div class="container px-4 mx-auto sm:px-6 max-w-7xl">
      <div class="grid gap-8 sm:gap-12 lg:gap-16 lg:grid-cols-2">
        <!-- Contact Form -->
        <div class="fade-up">
          <div class="p-4 sm:p-6 md:p-8 card-modern rounded-xl sm:rounded-2xl md:rounded-3xl">
            <h2 class="mb-6 text-2xl font-bold sm:mb-8 sm:text-3xl gradient-text">
              Send us a Message
            </h2>
            <form id="contactForm" class="space-y-6">
              <div class="grid gap-4 sm:gap-6 sm:grid-cols-2">
                <div>
                  <label class="block mb-1.5 sm:mb-2 text-sm font-semibold text-gray-300"
                    >First Name</label
                  >
                  <input
                    type="text"
                    id="firstName"
                    class="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-white placeholder-gray-400 rounded-lg sm:rounded-xl input-modern text-sm sm:text-base"
                    placeholder="Enter your first name"
                    required
                  />
                  <div
                    class="hidden mt-1 text-sm text-red-400 error-message"
                  ></div>
                </div>
                <div>
                  <label class="block mb-2 text-sm font-semibold text-gray-300"
                    >Last Name</label
                  >
                  <input
                    type="text"
                    id="lastName"
                    class="w-full px-4 py-3 text-white placeholder-gray-400 rounded-xl input-modern"
                    placeholder="Enter your last name"
                    required
                  />
                  <div
                    class="hidden mt-1 text-sm text-red-400 error-message"
                  ></div>
                </div>
              </div>

              <div>
                <label class="block mb-2 text-sm font-semibold text-gray-300"
                  >Email Address</label
                >
                <input
                  type="email"
                  id="email"
                  class="w-full px-4 py-3 text-white placeholder-gray-400 rounded-xl input-modern"
                  placeholder="Enter your email "
                  required
                />
                <div
                  class="hidden mt-1 text-sm text-red-400 error-message"
                ></div>
              </div>

              <div>
                <label class="block mb-2 text-sm font-semibold text-gray-300"
                  >Phone Number</label
                >
                <input
                  type="tel"
                  id="phone"
                  class="w-full px-4 py-3 text-white placeholder-gray-400 rounded-xl input-modern"
                  placeholder="Enter your number "
                />
              </div>

             

              <div>
                <label class="block mb-2 text-sm font-semibold text-gray-300"
                  >Message</label
                >
                <textarea
                  id="message"
                  rows="5"
                  class="w-full px-4 py-3 text-white placeholder-gray-400 resize-none rounded-xl input-modern"
                  placeholder="Tell us how we can help you..."
                  required
                ></textarea>
                <div
                  class="hidden mt-1 text-sm text-red-400 error-message"
                ></div>
              </div>

              <div class="flex items-center">
                <input
                  type="checkbox"
                  id="newsletter"
                  class="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
                />
                <label for="newsletter" class="ml-2 text-sm text-gray-300"
                  >Subscribe to our newsletter for movie updates</label
                >
              </div>

              <button
                type="submit"
                class="w-full px-8 py-4 text-lg font-bold text-white transition-all duration-300 transform bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl hover:scale-105 neon-glow"
              >
                Send Message
              </button>
            </form>

            <div
              id="successMessage"
              class="hidden p-4 mt-6 text-green-400 bg-green-500 border border-green-500 bg-opacity-20 rounded-xl"
            >
              <div class="flex items-center">
                <span class="mr-3 text-2xl">✅</span>
                <span
                  >Thank you! Your message has been sent successfully. We'll get
                  back to you soon.</span
                >
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Information -->
        <div class="space-y-8">
          <!-- Contact Methods -->
          <div class="fade-up" style="animation-delay: 0.2s">
            <h2 class="mb-8 text-3xl font-bold gradient-text">
              Contact Information
            </h2>
            <div class="space-y-6">
              <div class="flex items-center p-6 card-modern rounded-2xl">
                <div
                  class="flex items-center justify-center w-16 h-16 mr-6 text-2xl rounded-full bg-gradient-to-br from-blue-500 to-purple-600 neon-glow"
                >
                  📧
                </div>
                <div>
                  <h3 class="mb-1 text-xl font-bold gradient-text">Email Us</h3>
                  <p class="text-gray-400">fahadnaveed159@gmail.com</p>
                  <p class="text-gray-400">support@shofilm.com</p>
                </div>
              </div>

              <div class="flex items-center p-6 card-modern rounded-2xl">
                <div
                  class="flex items-center justify-center w-16 h-16 mr-6 text-2xl rounded-full bg-gradient-to-br from-green-500 to-teal-600 neon-glow"
                >
                  📱
                </div>
                <a href="tel:+923111023951" class="flex">
                  <div>
                    <h3 class="mb-1 text-xl font-bold gradient-text">Call Us</h3>
                    <p class="text-gray-400">+92 311-1023951</p>
                    <p class="text-gray-400">Mon-Fri, 9AM-6PM PST</p>
                  </div>
                </a>
              </div>

              <div class="flex items-center p-6 card-modern rounded-2xl">
                <div
                  class="flex items-center justify-center w-16 h-16 mr-6 text-2xl rounded-full bg-gradient-to-br from-pink-500 to-red-600 neon-glow"
                >
                  💬
                </div>
                <a href="https://wa.me/923111023951 " target="_blank" class="flex">
                  <div>
                    <h3 class="mb-1 text-xl font-bold gradient-text">Live Chat</h3>
                    <p class="text-gray-400">Available only Whatsaap</p>
                    <p class="text-gray-400">Instant support</p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <!-- Office Locations -->
          

          <!-- Social Media -->
          <div class="fade-up" style="animation-delay: 0.6s">
            <h2 class="mb-6 text-2xl font-bold sm:mb-8 sm:text-3xl gradient-text">Follow Us</h2>
           <div class="flex flex-wrap justify-center gap-4 sm:justify-start">
        <a
          class="transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
          href="https://www.linkedin.com/feed/?nis=true"
          target="_blank"
        >
          <Icon name="mdi:linkedin" class="text-2xl text-white sm:text-3xl" />
        </a>
        <a
          class="transition duration-300 ease-in-out delay- hover:-translate-y-1 hover:scale-110"
          href="https://www.facebook.com/profile.php?id=61565171947376"
          target="_blank"
        >
          <Icon name="mdi:facebook-box" class="mx-2 text-3xl text-white" />
        </a>
        <a
          class="transition duration-300 ease-in-out delay- hover:-translate-y-1 hover:scale-110"
          href="https://wa.me/923111023951"
          target="_blank"
        >
          <Icon name="mdi:whatsapp" class="mx-2 text-3xl text-white" />
        </a>
        <a
          class="transition duration-300 ease-in-out delay- hover:-translate-y-1 hover:scale-110"
          href="https://github.com/fahadnaveed159"
          target="_blank"
        >
          <Icon name="mdi:github" class="mx-2 text-3xl text-white" />
        </a>
        
      </div>
          </div>
        </div>
      </div>
    </div>
  </main>

  <!-- FAQ Section -->
  
  <!-- Floating Chat Widget -->
  <div class="hidden chat-widget sm:block">
    <button
      class="relative flex items-center justify-center w-12 h-12 text-xl transition-transform duration-300 rounded-full shadow-2xl sm:w-16 sm:h-16 sm:text-2xl bg-gradient-to-br from-purple-600 to-pink-600 hover:scale-110 neon-glow"
    >
      <div class="absolute inset-0 bg-purple-600 rounded-full pulse-ring"></div>
      💬
    </button>
  </div>
  <!-- Mobile Fixed Contact Button -->
  <div class="fixed z-50 transform -translate-x-1/2 bottom-4 left-1/2 sm:hidden">
    <button
      class="flex items-center px-6 py-3 space-x-2 text-white rounded-full shadow-lg bg-gradient-to-r from-purple-600 to-pink-600"
    >
      <span>Contact Us</span>
      <span>💬</span>
    </button>
  </div>

  <!-- Footer -->
 
</template>


