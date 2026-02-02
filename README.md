# Money Manager - Frontend

A modern React-based frontend application for managing income and expenses with real-time analytics and beautiful UI.

## Features

- **User Authentication**: Login and registration with JWT
- **Dashboard Analytics**: View weekly, monthly, and yearly summaries
- **Transaction Management**: Add, edit, delete, and filter transactions
- **Real-time Updates**: Instant dashboard updates on data changes
- **Advanced Filters**: Filter by type, category, division, and date range
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Beautiful UI**: Tailwind CSS with gradient backgrounds and smooth animations
- **12-Hour Edit Rule**: Transactions can only be edited within 12 hours

## Tech Stack

- **Framework**: React 18
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Icons**: SVG icons
- **Build Tool**: Create React App

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend server running (see backend README)

### Steps

1. **Navigate to frontend folder**
   ```bash
   cd money-manager-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env`:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```
   
   For production, use your deployed backend URL:
   ```env
   REACT_APP_API_URL=https://your-backend-url.com/api
   ```

4. **Start the development server**
   ```bash
   npm start
   ```
   
   App will run on `http://localhost:3000`

5. **Build for production**
   ```bash
   npm run build
   ```
   
   Creates optimized production build in `build/` folder

## Project Structure

```
money-manager-frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── AddTransactionModal.js    # Add income/expense modal
│   │   ├── Filters.js                # Filter controls
│   │   ├── SummaryCard.js            # Summary card component
│   │   └── TransactionList.js        # Transaction history list
│   ├── pages/
│   │   ├── Dashboard.js              # Main dashboard page
│   │   ├── Login.js                  # Login page
│   │   └── Register.js               # Registration page
│   ├── services/
│   │   ├── api.js                    # Axios instance
│   │   ├── authService.js            # Authentication service
│   │   └── transactionService.js     # Transaction service
│   ├── App.js                        # Main app component with routing
│   ├── index.css                     # Tailwind CSS imports
│   └── index.js                      # Entry point
├── .env.example
├── .gitignore
├── package.json
├── postcss.config.js
└── tailwind.config.js
```

## Pages & Features

### 1. Register Page (`/register`)
- Create new account
- Form validation
- Auto-login after registration
- Redirect to dashboard

### 2. Login Page (`/login`)
- User authentication
- JWT token storage
- Remember user session
- Link to registration

### 3. Dashboard (`/dashboard`)

**Summary Cards**
- Total Income (all time)
- Total Expenses (all time)
- Current Balance

**Period Summaries**
- Weekly summary
- Monthly summary
- Yearly summary

**Transaction Management**
- Add new transactions (floating + button)
- View transaction history
- Edit transactions (within 12 hours)
- Delete transactions
- Real-time updates

**Filters**
- Filter by type (income/expense)
- Filter by category
- Filter by division (personal/office)
- Filter by date range (week/month/year)

### 4. Add Transaction Modal

**Two Tabs**: Income | Expense

**Fields**:
- Amount (₹)
- Category (dropdown)
  - Income: salary, business, investment, others
  - Expense: fuel, food, movie, medical, loan, others
- Division (radio buttons)
  - Personal
  - Office
- Date & Time
- Description (one-line)

**Features**:
- Form validation
- Auto-close on success
- Real-time dashboard refresh

## Components

### SummaryCard
Displays income, expense, or balance with icon and color coding

### AddTransactionModal
Modal popup with tabs for adding income or expense transactions

### TransactionList
Displays all transactions with edit/delete actions and 12-hour edit restriction

### Filters
Filter controls for type, category, division, and date range

## Services

### authService
- `register(userData)` - Register new user
- `login(credentials)` - Login user
- `logout()` - Logout and clear storage
- `getCurrentUser()` - Get user from localStorage
- `isAuthenticated()` - Check if user is logged in

### transactionService
- `addTransaction(data)` - Add new transaction
- `getTransactions(filters)` - Get filtered transactions
- `getSummary()` - Get analytics summary
- `editTransaction(id, data)` - Edit transaction
- `deleteTransaction(id)` - Delete transaction

## Styling

Using **Tailwind CSS** for:
- Responsive design
- Gradient backgrounds
- Shadow effects
- Hover animations
- Form styling
- Color schemes

## Color Scheme

- **Primary**: Blue (#3B82F6)
- **Secondary**: Purple (#8B5CF6)
- **Success/Income**: Green (#10B981)
- **Danger/Expense**: Red (#EF4444)
- **Warning**: Orange (#F59E0B)

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project to Vercel
3. Set environment variable:
   ```
   REACT_APP_API_URL=https://your-backend-url.com/api
   ```
4. Deploy

### Netlify

1. Build the project: `npm run build`
2. Drag `build/` folder to Netlify
3. Or connect GitHub repo
4. Set environment variables in Netlify dashboard

### Manual Deployment

1. Build: `npm run build`
2. Upload `build/` folder to any static hosting
3. Configure server to redirect all routes to `index.html`

## Environment Variables

```env
# Development
REACT_APP_API_URL=http://localhost:5000/api

# Production
REACT_APP_API_URL=https://your-backend-url.com/api
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Code splitting with React Router
- Lazy loading components
- Optimized production build
- Minimal bundle size

## Future Enhancements

- Charts and graphs (recharts integration)
- Export transactions to CSV/Excel
- Dark mode
- Mobile app version
- Offline support with PWA
- Budget planning module
- Receipt upload

## Troubleshooting

### CORS Error
Ensure backend has CORS enabled and `REACT_APP_API_URL` is correct

### Build Fails
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### API Not Connecting
Check `.env` file and restart development server after changes

## License

MIT

## Author

Money Manager Team

---

For backend setup, see `money-manager-backend/README.md`
