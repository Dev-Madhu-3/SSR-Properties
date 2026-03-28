# SSR Properties - Real Estate Website

A modern, production-ready real estate website built with React, Vite, and Tailwind CSS. Features stunning animations, SEO optimization, and integrated email functionality.

![SSR Properties](https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80)

## 🚀 Features

### Core Features
- **Responsive Design** - Fully responsive across all devices (mobile, tablet, desktop)
- **Modern UI/UX** - Clean, professional design with smooth animations
- **SEO Optimized** - Meta tags, structured data, and semantic HTML
- **Fast Performance** - Built with Vite for lightning-fast builds and HMR
- **Email Integration** - Contact forms powered by EmailJS
- **Smooth Animations** - Framer Motion animations throughout

### Sections
1. **Hero Section** - Animated background slider with statistics
2. **Featured Properties** - Infinite scroll property showcase
3. **About Us** - Company information with values and features
4. **Project Details** - Detailed project showcase with gallery
5. **Projects** - Horizontal scroll project cards
6. **Blog** - Real estate insights with load more functionality
7. **Contact** - Contact form with map integration
8. **Footer** - Comprehensive footer with newsletter signup

### Technical Features
- ⚡ **Vite** - Next-generation frontend tooling
- ⚛️ **React 18** - Latest React with hooks
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🧩 **shadcn/ui** - Beautiful UI components
- 🎬 **Framer Motion** - Production-ready animations
- 📧 **EmailJS** - Email service integration
- 🔍 **React Helmet** - SEO management
- 📱 **Fully Responsive** - Mobile-first design

## 📁 Project Structure

```
ssr-properties/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable components
│   │   └── ScrollToTop.jsx
│   ├── sections/           # Page sections
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── FeaturedSlider.jsx
│   │   ├── About.jsx
│   │   ├── ProjectDetail.jsx
│   │   ├── Projects.jsx
│   │   ├── Blog.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   ├── hooks/              # Custom React hooks
│   ├── App.jsx             # Main app component
│   ├── App.css             # App-specific styles
│   ├── index.css           # Global styles
│   └── main.jsx            # Entry point
├── index.html              # HTML template
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind configuration
├── .env.example            # Environment variables template
└── package.json            # Dependencies
```

## 🛠️ Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ssr-properties.git
   cd ssr-properties
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure EmailJS**
   - Create an account at [EmailJS](https://www.emailjs.com/)
   - Create an email service
   - Create an email template
   - Copy `.env.example` to `.env`
   - Fill in your EmailJS credentials:
     ```
     VITE_EMAILJS_SERVICE_ID=your_service_id
     VITE_EMAILJS_TEMPLATE_ID=your_template_id
     VITE_EMAILJS_USER_ID=your_public_key
     ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 📧 EmailJS Setup Guide

### Step 1: Create EmailJS Account
1. Go to [EmailJS](https://www.emailjs.com/) and sign up
2. Verify your email address

### Step 2: Add Email Service
1. Go to "Email Services" in the dashboard
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the connection steps
5. Note down the **Service ID**

### Step 3: Create Email Template
1. Go to "Email Templates"
2. Click "Create New Template"
3. Design your template with these variables:
   - `{{from_name}}` - Sender's name
   - `{{from_email}}` - Sender's email
   - `{{phone}}` - Phone number
   - `{{project}}` - Selected project (for booking form)
   - `{{visit_date}}` - Preferred visit date
   - `{{message}}` - Message content
4. Save and note down the **Template ID**

### Step 4: Get Public Key
1. Go to "Account" > "API Keys"
2. Copy your **Public Key**

### Step 5: Update Environment Variables
Create a `.env` file in the root directory:
```
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_USER_ID=your_public_key_here
```

## 🎨 Customization

### Colors
The website uses a gold color scheme. Update these values in `tailwind.config.js`:
```javascript
colors: {
  gold: {
    DEFAULT: '#c89b3c',
    light: '#e6c66a',
    dark: '#b88a2d',
  }
}
```

### Images
Replace images in the components with your own:
- Hero backgrounds: `src/sections/Hero.jsx`
- Property images: `src/sections/FeaturedSlider.jsx`
- Project images: `src/sections/Projects.jsx`
- Blog images: `src/sections/Blog.jsx`

### Content
Update the content in each section component:
- Company info: `src/sections/About.jsx`
- Project details: `src/sections/ProjectDetail.jsx`
- Blog posts: `src/sections/Blog.jsx`
- Contact info: `src/sections/Contact.jsx`

## 📱 Responsive Breakpoints

| Breakpoint | Width | Description |
|------------|-------|-------------|
| sm | 640px | Small devices |
| md | 768px | Tablets |
| lg | 1024px | Laptops |
| xl | 1280px | Desktops |
| 2xl | 1536px | Large screens |

## 🔍 SEO Configuration

### Meta Tags
Update meta tags in `index.html`:
- Title
- Description
- Keywords
- Open Graph tags
- Twitter Card tags

### Structured Data
The website includes JSON-LD structured data for:
- Real Estate Agent
- Organization
- Contact information

Update the structured data in `index.html` with your actual business information.

## 🚀 Deployment

### Build
```bash
npm run build
```

### Deploy to Netlify
1. Push code to GitHub
2. Connect repository to Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`

### Deploy to Vercel
1. Push code to GitHub
2. Import project in Vercel
3. Framework preset: Vite
4. Build command: `npm run build`
5. Output directory: `dist`

## 🧪 Performance Optimization

### Lazy Loading
- Images use `loading="lazy"` attribute
- Components can be lazy loaded with React.lazy()

### Code Splitting
Vite automatically handles code splitting for optimal performance.

### Image Optimization
- Use WebP format when possible
- Compress images before adding to project
- Use appropriate image sizes

## 🐛 Troubleshooting

### Common Issues

**Email not sending**
- Check EmailJS credentials in `.env`
- Verify template variables match the code
- Check browser console for errors

**Build fails**
- Ensure Node.js 18+ is installed
- Delete `node_modules` and run `npm install`
- Check for syntax errors in components

**Styles not applying**
- Verify Tailwind CSS is properly configured
- Check class names for typos
- Ensure `index.css` is imported in `main.jsx`

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📞 Support

For support, email sales@ssrproperties.in or call +91 99002 28668.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Framer Motion](https://www.framer.com/motion/) for animations
- [EmailJS](https://www.emailjs.com/) for email functionality
- [Unsplash](https://unsplash.com/) for stock images

---

Built with ❤️ by SSR Properties Team
