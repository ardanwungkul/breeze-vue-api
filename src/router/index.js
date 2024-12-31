import { createWebHistory, createRouter } from 'vue-router'
import { useUsers } from '@/stores/user'
import Welcome from '@/pages/guest/Welcome.vue'
import AboutUs from '@/pages/guest/AboutUs.vue'
import Article from '@/pages/guest/Article.vue'
import OfficialAgent from '@/pages/guest/officialAgent.vue'

import PageNotFound from '@/pages/errors/404.vue'
import Dashboard from '@/pages/Dashboard.vue'
import Login from '@/pages/auth/Login.vue'
import Register from '@/pages/auth/Register.vue'
import ForgotPassword from '@/pages/auth/ForgotPassword.vue'
import ResetPassword from '@/pages/auth/ResetPassword.vue'
import VerifyEmail from '@/pages/auth/VerifyEmail.vue'

const APP_NAME = import.meta.env.VITE_APP_NAME

const routes = [
    // Dashboard
    {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
        meta: {
            title: 'Dashboard',
            guard: 'auth',
            role: 'admin',
        },
    },
    // MARK:Guest
    {
        path: '/',
        name: 'welcome',
        component: Welcome,
        meta: {
            title: 'Home',
            metaTags: [
                {
                    name: 'Welcome',
                },
                {
                    property: 'og:Welcome',
                },
            ],
        },
    },
    {
        path: '/article/:slug',
        name: 'user.article.show',
        component: () => import('@/pages/guest/article/Show.vue'),
        query: {
            verified: 'verified',
        },
    },
    {
        path: '/shop',
        name: 'shop',
        component: () => import('@/pages/guest/Shop.vue'),
        meta: {
            title: 'Shop',
        },
    },
    {
        path: '/article',
        name: 'article',
        component: Article,
        meta: {
            title: 'Article',
        },
    },
    {
        path: '/official-agent',
        name: 'officialAgent',
        component: OfficialAgent,
        meta: {
            title: 'Official Agent',
        },
    },
    {
        path: '/about-us',
        name: 'aboutUs',
        component: AboutUs,
        meta: {
            title: 'About Us',
        },
    },

    // MARK:Admin
    // Admin Dashboard
    {
        path: '/admin/dashboard/',
        name: 'admin.dashboard',
        component: () => import('@/pages/admin/Dashboard.vue'),
        query: {
            verified: 'verified',
        },
        meta: {
            guard: 'auth',
            role: 'admin',
        },
    },
    // Admin Users
    {
        path: '/admin/user',
        name: 'admin.user.index',
        component: () => import('@/pages/admin/user/Index.vue'),
        query: {
            verified: 'verified',
        },
        meta: {
            guard: 'auth',
            role: 'admin',
        },
    },
    // Admin Stocks
    {
        path: '/admin/stock',
        name: 'admin.stock.index',
        component: () => import('@/pages/admin/stock/Index.vue'),
        query: {
            verified: 'verified',
        },
        meta: {
            guard: 'auth',
            role: 'admin',
        },
    },
    {
        path: '/admin/stock/scan',
        name: 'admin.stock.scan',
        component: () => import('@/pages/admin/stock/Scan.vue'),
        query: {
            verified: 'verified',
        },
        meta: {
            guard: 'auth',
            role: 'admin',
        },
    },
    // Admin Product
    {
        path: '/admin/product',
        name: 'admin.product.index',
        component: () => import('@/pages/admin/product/Index.vue'),
        query: {
            verified: 'verified',
        },
        meta: {
            guard: 'auth',
            role: 'admin',
        },
    },
    {
        path: '/admin/product/create',
        name: 'admin.product.create',
        component: () => import('@/pages/admin/product/Create.vue'),
        query: {
            verified: 'verified',
        },
        meta: {
            guard: 'auth',
            role: 'admin',
        },
    },
    {
        path: '/admin/product/:id/edit',
        name: 'admin.product.edit',
        component: () => import('@/pages/admin/product/Edit.vue'),
        props: true,
        meta: {
            title: 'Edit Product',
            guard: 'auth',
            role: 'admin',
        },
    },
    // Admin Category
    {
        path: '/admin/category',
        name: 'admin.category.index',
        component: () => import('@/pages/admin/category/Index.vue'),
        query: {
            verified: 'verified',
        },
        meta: {
            guard: 'auth',
            role: 'admin',
        },
    },

    // Shop Banner
    {
        path: '/admin/shop/banner',
        name: 'admin.shop.index.banner',
        component: () => import('@/pages/admin/shop/Banner.vue'),
        query: {
            verified: 'verified',
        },
        meta: {
            guard: 'auth',
            role: 'admin',
        },
    },
    // Shop Flash Sale
    {
        path: '/admin/shop/flash-sale',
        name: 'admin.shop.index.flash-sale',
        component: () => import('@/pages/admin/shop/FlashSale.vue'),
        query: {
            verified: 'verified',
        },
        meta: {
            guard: 'auth',
            role: 'admin',
        },
    },
    {
        path: '/admin/shop/flash-sale/:id',
        name: 'admin.shop.show.flash-sale',
        component: () => import('@/pages/admin/shop/ShowFlashSale.vue'),
        query: {
            verified: 'verified',
        },
        meta: {
            guard: 'auth',
            role: 'admin',
        },
        props: true,
    },

    // About Us
    {
        path: '/admin/about-us',
        name: 'admin.about-us.index',
        component: () => import('@/pages/admin/about-us/Index.vue'),
        query: {
            verified: 'verified',
        },
        meta: {
            guard: 'auth',
            role: 'admin',
        },
    },
    // About Us Create
    {
        path: '/admin/about-us/create',
        name: 'admin.about-us.create',
        component: () => import('@/pages/admin/about-us/Create.vue'),
        query: {
            verified: 'verified',
        },
        meta: {
            guard: 'auth',
            role: 'admin',
        },
    },
    // About Us Edit
    {
        path: '/admin/about-us/edit/:id',
        name: 'admin.about-us.edit',
        component: () => import('@/pages/admin/about-us/Edit.vue'),
        query: {
            verified: 'verified',
        },
        meta: {
            guard: 'auth',
            role: 'admin',
        },
    },
    // Voucher
    {
        path: '/admin/voucher',
        name: 'admin.voucher.index',
        component: () => import('@/pages/admin/voucher/Index.vue'),
        query: {
            verified: 'verified',
        },
        meta: {
            guard: 'auth',
            role: 'admin',
        },
    },
    {
        path: '/admin/voucher/create',
        name: 'admin.voucher.create',
        component: () => import('@/pages/admin/voucher/Create.vue'),
        query: {
            verified: 'verified',
        },
        meta: {
            guard: 'auth',
            role: 'admin',
        },
    },
    {
        path: '/admin/voucher/:id/edit',
        name: 'admin.voucher.edit',
        component: () => import('@/pages/admin/voucher/Edit.vue'),
        query: {
            verified: 'verified',
        },
        meta: {
            guard: 'auth',
            role: 'admin',
        },
        props: true,
    },

    // Articles
    {
        path: '/admin/articles',
        name: 'admin.article.index',
        component: () => import('@/pages/admin/article/Index.vue'),
        query: {
            verified: 'verified',
        },
        meta: {
            guard: 'auth',
            role: 'admin',
        },
    },
    {
        path: '/admin/articles/create',
        name: 'admin.article.create',
        component: () => import('@/pages/admin/article/Create.vue'),
        query: {
            verified: 'verified',
        },
        meta: {
            guard: 'auth',
            role: 'admin',
        },
    },
    {
        path: '/admin/articles/:id/edit',
        name: 'admin.article.edit',
        component: () => import('@/pages/admin/article/Edit.vue'),
        query: {
            verified: 'verified',
        },
        meta: {
            guard: 'auth',
            role: 'admin',
        },
    },
    // Payment
    {
        path: '/admin/payments',
        name: 'admin.payment.index',
        component: () => import('@/pages/admin/payment/Index.vue'),
        query: {
            verified: 'verified',
        },
        meta: {
            guard: 'auth',
            role: 'admin',
        },
    },
    // Cash Flow
    {
        path: '/admin/cash-flow',
        name: 'admin.cashflow.index',
        component: () => import('@/pages/admin/cashflow/Index.vue'),
        query: {
            verified: 'verified',
        },
        meta: {
            guard: 'auth',
            role: 'admin',
        },
    },
    {
        path: '/admin/expense/create',
        name: 'admin.expense.create',
        component: () => import('@/pages/admin/cashflow/expense/Create.vue'),
        query: {
            verified: 'verified',
        },
        meta: {
            guard: 'auth',
            role: 'admin',
        },
    },
    {
        path: '/admin/expense/:id/edit',
        name: 'admin.expense.edit',
        component: () => import('@/pages/admin/cashflow/expense/Edit.vue'),
        query: {
            verified: 'verified',
        },
        meta: {
            guard: 'auth',
            role: 'admin',
        },
        props: true,
    },
    // Agents
    {
        path: '/admin/agents',
        name: 'admin.agent.index',
        component: () => import('@/pages/admin/agent/Index.vue'),
        query: {
            verified: 'verified',
        },
        meta: {
            guard: 'auth',
            role: 'admin',
        },
    },
    // MARK: User
    // Product Detail
    {
        path: '/product/detail/:slug/:id',
        name: 'product.detail',
        component: () => import('@/pages/guest/product/Show.vue'),
        props: true,
        meta: {
            title: 'Product Detail',
            guard: 'auth',
        },
    },
    // Cart
    {
        path: '/cart/',
        name: 'cart.index',
        component: () => import('@/pages/guest/order/Cart.vue'),
        props: true,
        meta: {
            title: 'Cart List',
            guard: 'auth',
        },
    },

    // Checkout
    {
        path: '/checkout/:data/',
        name: 'checkout',
        component: () => import('@/pages/guest/order/Checkout.vue'),
        props: true,
        meta: {
            title: 'Checkout',
            guard: 'auth',
        },
    },
    // Purchase
    {
        path: '/purchase/',
        name: 'purchase',
        component: () => import('@/pages/guest/order/Purchase.vue'),
        props: true,
        meta: {
            title: 'Purchase',
            guard: 'auth',
        },
    },
    {
        path: '/purchase/:id',
        name: 'purchase.detail',
        component: () => import('@/pages/guest/order/PurchaseDetail.vue'),
        props: true,
        meta: {
            title: 'Purchase',
            guard: 'auth',
        },
    },
    // MARK:Packing
    {
        path: '/packing/dashboard',
        name: 'packing.dashboard',
        component: () => import('@/pages/packing/Dashboard.vue'),
        meta: {
            guard: 'auth',
            role: 'packing',
        },
    },
    {
        path: '/packing/order/unpacked',
        name: 'packing.unpacked',
        component: () => import('@/pages/packing/Unpacked.vue'),
        meta: {
            guard: 'auth',
            role: 'packing',
        },
    },
    {
        path: '/packing/order/packed',
        name: 'packing.packed',
        component: () => import('@/pages/packing/Packed.vue'),
        meta: {
            guard: 'auth',
            role: 'packing',
        },
    },
    {
        path: '/packing/scan/:invoice',
        name: 'packing.scan',
        component: () => import('@/pages/packing/Scan.vue'),
        meta: {
            guard: 'auth',
            role: 'packing',
        },
    },
    // MARK: Report
    // Report Dashboard
    {
        path: '/report/dashboard',
        name: 'report.dashboard',
        component: () => import('@/pages/report/Dashboard.vue'),
        meta: {
            guard: 'auth',
            role: 'report',
        },
    },
    // Report Stock
    {
        path: '/report/stock',
        name: 'report.stock',
        component: () => import('@/pages/report/Stock.vue'),
        meta: {
            guard: 'auth',
            role: 'report',
        },
    },
    // Report Sales
    {
        path: '/report/sales',
        name: 'report.sales',
        component: () => import('@/pages/report/Sales.vue'),
        meta: {
            guard: 'auth',
            role: 'report',
        },
    },
    // Report Order
    {
        path: '/report/order',
        name: 'report.order',
        component: () => import('@/pages/report/Order.vue'),
        meta: {
            guard: 'auth',
            role: 'report',
        },
    },
    // Report Cash Flow
    {
        path: '/report/cash-flow',
        name: 'report.cashflow',
        component: () => import('@/pages/report/CashFlow.vue'),
        meta: {
            guard: 'auth',
            role: 'report',
        },
    },
    //  couriers
    {
        path: '/couriers',
        name: 'admin.couriers.index',
        component: () => import('@/pages/admin/couriers/index.vue'),
        meta: {
            guard: 'auth',
            role: 'admin',
        },
    },

    // MARK:Auth
    // Login
    {
        path: '/login',
        name: 'login',
        component: Login,
        query: {
            reset: 'reset',
        },
        meta: {
            title: 'Log in',
            guard: 'guest',
        },
    },
    // Register
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: {
            title: 'Register',
            guard: 'guest',
        },
    },
    // Forgot Password
    {
        path: '/forgot-password',
        name: 'forgot-password',
        component: ForgotPassword,
        meta: {
            title: 'Forget Password',
            guard: 'guest',
        },
    },
    // Password Token Reset
    {
        path: '/password-reset/:token',
        name: 'password-reset',
        component: ResetPassword,
        query: {
            email: 'email',
        },
        meta: {
            title: 'Reset Password',
            guard: 'guest',
        },
    },
    // Verify Email
    {
        path: '/verify-email',
        name: 'verify-email',
        component: VerifyEmail,
        query: {
            resend: 'resend',
        },
        meta: {
            title: 'Email Verification',
            guard: 'auth',
        },
    },
    // 404 Page
    {
        path: '/page-not-found',
        name: 'page-not-found',
        component: PageNotFound,
        meta: {
            title: 'Page Not Found',
        },
    },
    {
        path: '/:pathMatch(.*)*',
        // redirect: '/page-not-found',
        component: PageNotFound,
        meta: {
            title: 'Page Not Found',
        },
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

// Navigation guard

router.beforeEach((to, from, next) => {
    const store = useUsers()

    const auth = store.authUser

    if (to.matched.some(route => route.meta.guard === 'guest') && auth)
        next({ name: 'dashboard' })
    else if (to.matched.some(route => route.meta.guard === 'auth') && !auth)
        next({ name: 'login' })
    else next()
})

// Middleware Role
router.beforeEach(async (to, from, next) => {
    if (to.matched.some(route => route.meta.role)) {
        const store = useUsers()
        if (store.authUser) {
            if (!store.hasUserData) {
                await store.getData()
            }
        }
        const role = store.userData.role
        if (role && to.matched.some(route => route.meta.role === role)) {
            next()
        } else {
            return role === 'admin'
                ? next({ name: 'admin.dashboard' })
                : role === 'report'
                ? next({ name: 'report.dashboard' })
                : role === 'packing'
                ? next({ name: 'packing.dashboard' })
                : next({ name: 'welcome' })
        }
    } else {
        next()
    }
})

router.beforeEach((to, from, next) => {
    const nearestWithTitle = to.matched
        .slice()
        .reverse()
        .find(r => r.meta && r.meta.title)

    const nearestWithMeta = to.matched
        .slice()
        .reverse()
        .find(r => r.meta && r.meta.metaTags)

    if (nearestWithTitle) {
        document.title = nearestWithTitle.meta.title + ' - ' + APP_NAME
    } else {
        document.title = APP_NAME
    }

    Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(
        el => el.parentNode.removeChild(el),
    )

    if (!nearestWithMeta) return next()

    nearestWithMeta.meta.metaTags
        .map(tagDef => {
            const tag = document.createElement('meta')

            Object.keys(tagDef).forEach(key => {
                tag.setAttribute(key, tagDef[key])
            })

            tag.setAttribute('data-vue-router-controlled', '')

            return tag
        })

        .forEach(tag => document.head.appendChild(tag))

    next()
})

export default router
