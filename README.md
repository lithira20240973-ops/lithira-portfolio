# Lithira Kalubowila — Personal Portfolio

A premium, interactive personal portfolio website for **Lithira Kalubowila**, featuring smooth scrolling (Lenis), Framer Motion and GSAP animations, cinematic parallax, and high-end typography.

Built exclusively with **Next.js 14**, **Tailwind CSS**, and **Framer Motion**.

---

## 🚀 Running Locally

To run the development server locally on your machine:

1. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```
2. **Setup environment variables**
   Ensure you have your `.env` file copied from `.env.example` to inject your Resend API keys for the contact terminal.
   ```bash
   cp .env.example .env
   ```
3. **Start the server**
   ```bash
   npm run dev
   ```
   *Your site will be live at [http://localhost:3000](http://localhost:3000).*

---

## 🌐 How to Deploy to Vercel

Vercel provides native, optimized deployment for Next.js applications perfectly tailored for this portfolio.

1. **Push to GitHub**
   Commit all your changes and push them to your GitHub repository (`lithira20240973-ops`).
   ```bash
   git add .
   git commit -m "Deploying production portfolio"
   git push origin main
   ```
2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com).
   - Click **Add New** > **Project**.
   - Import your GitHub repository.
3. **Configure Settings**
   - Framework Preset: **Next.js**
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install --legacy-peer-deps` *(critical if using React 19 packages)*
   - **Environment Variables**: Add your `RESEND_API_KEY` here.
4. **Deploy**
   Click **Deploy**. Your site will be built and go live globally on Vercel's edge network.

---

## 🛠 Adding a Custom Domain (Porkbun)

To connect your custom `porkbun.com` domain to Vercel:
1. Go to your project dashboard on Vercel.
2. Navigate to **Settings > Domains**.
3. Enter your domain (e.g., `lithira.com`) and click **Add**.
4. Log into your Porkbun account and go to Domain Management.
5. In DNS Records, add the Vercel-provided A Records or Nameservers:
   - Create an **A Record** pointing to `76.76.21.21`.
   - Create a **CNAME Record** for `www` pointing to `cname.vercel-dns.com`.
6. Wait for Vercel to provision the free SSL certificates.

---

## 🎨 Future Updates & Maintenance

Because you are perfectly integrated with GitHub and Vercel, every time you push an update to your code via Git, Vercel will **automatically trigger a new build and deploy it.**

To update specific fields easily:
- **CV PDF:** Replace `public/CV.pdf` with your latest resume.
- **Drone Videos:** Swap out `public/videos/drone/drone1.mp4` with high-quality compressed `.mp4` files.
- **Projects:** Open `src/components/Projects.tsx` and modify the `PROJECTS` array at the top. Ensure your project screenshots are inside `public/images/projects/`.

> Designed and engineered for absolute premium visual delivery.
