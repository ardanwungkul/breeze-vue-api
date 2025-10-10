<script setup>
import { ref, computed } from 'vue'
import Multiselect from 'vue-multiselect'
import '@/assets/css/vue-multiselect.css'
import KYCVerification from './KYCVerification.vue'
import KYCImage from '@/assets/images/kyc-image.png'
import { useFileStore } from '../../stores/file'

const props = defineProps({
    user: {
        type: Object,
        default: null,
    },
})

const form = ref({
    bussiness_detail: {
        type: '',
        legal_name: null,
        trading_name: null,
        description: null,
        industry_category: '',
        date_of_registration: null,
        country_of_operation: '',
    },
    individual_details: {
        type: '',
        role: 'Owner',
        given_names: null,
        surname: null,
        phone_number: null,
        email: null,
        nationality: null,
        place_of_birth: null,
        date_of_birth: null,
        gender: null,
        tax_identification_number: null,
    },
    address: {
        country: null,
        city: null,
        province_state: null,
        street_line1: null,
        street_line2: null,
        district: null,
        sub_district: null,
        postal_code: null,
    },
    kyc_documents: {
        CORPORATION: [
            {
                country: 'ID',
                type: 'ID_KTP',
                expires_at: null,
                file_id: null,
                file: null,
            },
            {
                country: 'ID',
                type: 'ID_COMPANY_NPWP',
                expires_at: null,
                file_id: null,
                file: null,
            },
            {
                country: 'ID',
                type: 'ID_NIB',
                expires_at: null,
                file_id: null,
                file: null,
            },
            {
                country: 'ID',
                type: 'ID_AKTA',
                expires_at: null,
                file_id: null,
                file: null,
            },
            {
                country: 'ID',
                type: 'ID_SKMENKEH',
                expires_at: null,
                file_id: null,
                file: null,
            },
        ],
        SOLE_PROPRIETORSHIP: [
            {
                country: 'ID',
                type: 'ID_KTP',
                expires_at: null,
                file_id: null,
                file: null,
            },
            {
                country: 'ID',
                type: 'ID_INDIVIDUAL_NPWP',
                expires_at: null,
                file_id: null,
                file: null,
            },
            {
                country: 'ID',
                type: 'ID_NIB',
                expires_at: null,
                file_id: null,
                file: null,
            },
            {
                country: 'ID',
                type: 'ID_SPP_PP',
                expires_at: null,
                file_id: null,
                file: null,
            },
            {
                country: 'ID',
                type: 'ID_SERT_PP',
                expires_at: null,
                file_id: null,
                file: null,
            },
        ],
        INDIVIDUAL: [
            {
                country: 'ID',
                type: 'ID_KTP',
                expires_at: null,
                file_id: null,
                file: null,
            },
            {
                country: 'ID',
                type: 'ID_INDIVIDUAL_NPWP',
                expires_at: null,
                file_id: null,
                file: null,
            },
        ],
        PARTNERSHIP: [
            {
                country: 'ID',
                type: 'ID_KTP',
                expires_at: null,
                file_id: null,
                file: null,
            },
            {
                country: 'ID',
                type: 'ID_COMPANY_NPWP',
                expires_at: null,
                file_id: null,
                file: null,
            },
            {
                country: 'ID',
                type: 'ID_NIB',
                expires_at: null,
                file_id: null,
                file: null,
            },
            {
                country: 'ID',
                type: 'ID_AKTA',
                expires_at: null,
                file_id: null,
                file: null,
            },
        ],
        FOREIGN: [
            {
                country: 'ID',
                type: 'PASSPORT',
                expires_at: null,
                file_id: null,
                file: null,
            },
            {
                country: 'ID',
                type: 'FOREIGN_BUSINESS_LICENSE',
                expires_at: null,
                file_id: null,
                file: null,
            },
            {
                country: 'ID',
                type: 'FOREIGN_REGISTRATION_DOCUMENT',
                expires_at: null,
                file_id: null,
                file: null,
            },
        ],
    },
    website_url: null,
    phone_number: null,
    email: null,
})

const phone_number = ref()
const phone_number_data = ref()

function phoneNumberInput(value, info) {
    phone_number_data.value = info
    if (info.valid == true) {
        form.value.individual_details.phone_number = info.number
    } else {
        form.value.individual_details.phone_number = null
    }
}

const countryArray = [
    { code: 'AF', name: 'Afghanistan' },
    { code: 'AX', name: 'Aland Islands' },
    { code: 'AL', name: 'Albania' },
    { code: 'DZ', name: 'Algeria' },
    { code: 'AS', name: 'American Samoa' },
    { code: 'AD', name: 'Andorra' },
    { code: 'AO', name: 'Angola' },
    { code: 'AI', name: 'Anguilla' },
    { code: 'AQ', name: 'Antarctica' },
    { code: 'AG', name: 'Antigua And Barbuda' },
    { code: 'AR', name: 'Argentina' },
    { code: 'AM', name: 'Armenia' },
    { code: 'AW', name: 'Aruba' },
    { code: 'AU', name: 'Australia' },
    { code: 'AT', name: 'Austria' },
    { code: 'AZ', name: 'Azerbaijan' },
    { code: 'BS', name: 'Bahamas' },
    { code: 'BH', name: 'Bahrain' },
    { code: 'BD', name: 'Bangladesh' },
    { code: 'BB', name: 'Barbados' },
    { code: 'BY', name: 'Belarus' },
    { code: 'BE', name: 'Belgium' },
    { code: 'BZ', name: 'Belize' },
    { code: 'BJ', name: 'Benin' },
    { code: 'BM', name: 'Bermuda' },
    { code: 'BT', name: 'Bhutan' },
    { code: 'BO', name: 'Bolivia' },
    { code: 'BA', name: 'Bosnia And Herzegovina' },
    { code: 'BW', name: 'Botswana' },
    { code: 'BV', name: 'Bouvet Island' },
    { code: 'BR', name: 'Brazil' },
    { code: 'IO', name: 'British Indian Ocean Territory' },
    { code: 'BN', name: 'Brunei Darussalam' },
    { code: 'BG', name: 'Bulgaria' },
    { code: 'BF', name: 'Burkina Faso' },
    { code: 'BI', name: 'Burundi' },
    { code: 'KH', name: 'Cambodia' },
    { code: 'CM', name: 'Cameroon' },
    { code: 'CA', name: 'Canada' },
    { code: 'CV', name: 'Cape Verde' },
    { code: 'KY', name: 'Cayman Islands' },
    { code: 'CF', name: 'Central African Republic' },
    { code: 'TD', name: 'Chad' },
    { code: 'CL', name: 'Chile' },
    { code: 'CN', name: 'China' },
    { code: 'CX', name: 'Christmas Island' },
    { code: 'CC', name: 'Cocos (Keeling) Islands' },
    { code: 'CO', name: 'Colombia' },
    { code: 'KM', name: 'Comoros' },
    { code: 'CG', name: 'Congo' },
    { code: 'CD', name: 'Congo, Democratic Republic' },
    { code: 'CK', name: 'Cook Islands' },
    { code: 'CR', name: 'Costa Rica' },
    { code: 'CI', name: "Cote D'Ivoire" },
    { code: 'HR', name: 'Croatia' },
    { code: 'CU', name: 'Cuba' },
    { code: 'CY', name: 'Cyprus' },
    { code: 'CZ', name: 'Czech Republic' },
    { code: 'DK', name: 'Denmark' },
    { code: 'DJ', name: 'Djibouti' },
    { code: 'DM', name: 'Dominica' },
    { code: 'DO', name: 'Dominican Republic' },
    { code: 'EC', name: 'Ecuador' },
    { code: 'EG', name: 'Egypt' },
    { code: 'SV', name: 'El Salvador' },
    { code: 'GQ', name: 'Equatorial Guinea' },
    { code: 'ER', name: 'Eritrea' },
    { code: 'EE', name: 'Estonia' },
    { code: 'ET', name: 'Ethiopia' },
    { code: 'FK', name: 'Falkland Islands (Malvinas)' },
    { code: 'FO', name: 'Faroe Islands' },
    { code: 'FJ', name: 'Fiji' },
    { code: 'FI', name: 'Finland' },
    { code: 'FR', name: 'France' },
    { code: 'GF', name: 'French Guiana' },
    { code: 'PF', name: 'French Polynesia' },
    { code: 'TF', name: 'French Southern Territories' },
    { code: 'GA', name: 'Gabon' },
    { code: 'GM', name: 'Gambia' },
    { code: 'GE', name: 'Georgia' },
    { code: 'DE', name: 'Germany' },
    { code: 'GH', name: 'Ghana' },
    { code: 'GI', name: 'Gibraltar' },
    { code: 'GR', name: 'Greece' },
    { code: 'GL', name: 'Greenland' },
    { code: 'GD', name: 'Grenada' },
    { code: 'GP', name: 'Guadeloupe' },
    { code: 'GU', name: 'Guam' },
    { code: 'GT', name: 'Guatemala' },
    { code: 'GG', name: 'Guernsey' },
    { code: 'GN', name: 'Guinea' },
    { code: 'GW', name: 'Guinea-Bissau' },
    { code: 'GY', name: 'Guyana' },
    { code: 'HT', name: 'Haiti' },
    { code: 'HM', name: 'Heard Island & Mcdonald Islands' },
    { code: 'VA', name: 'Holy See (Vatican City State)' },
    { code: 'HN', name: 'Honduras' },
    { code: 'HK', name: 'Hong Kong' },
    { code: 'HU', name: 'Hungary' },
    { code: 'IS', name: 'Iceland' },
    { code: 'IN', name: 'India' },
    { code: 'ID', name: 'Indonesia' },
    { code: 'IR', name: 'Iran, Islamic Republic Of' },
    { code: 'IQ', name: 'Iraq' },
    { code: 'IE', name: 'Ireland' },
    { code: 'IM', name: 'Isle Of Man' },
    { code: 'IL', name: 'Israel' },
    { code: 'IT', name: 'Italy' },
    { code: 'JM', name: 'Jamaica' },
    { code: 'JP', name: 'Japan' },
    { code: 'JE', name: 'Jersey' },
    { code: 'JO', name: 'Jordan' },
    { code: 'KZ', name: 'Kazakhstan' },
    { code: 'KE', name: 'Kenya' },
    { code: 'KI', name: 'Kiribati' },
    { code: 'KR', name: 'Korea' },
    { code: 'KW', name: 'Kuwait' },
    { code: 'KG', name: 'Kyrgyzstan' },
    { code: 'LA', name: "Lao People's Democratic Republic" },
    { code: 'LV', name: 'Latvia' },
    { code: 'LB', name: 'Lebanon' },
    { code: 'LS', name: 'Lesotho' },
    { code: 'LR', name: 'Liberia' },
    { code: 'LY', name: 'Libyan Arab Jamahiriya' },
    { code: 'LI', name: 'Liechtenstein' },
    { code: 'LT', name: 'Lithuania' },
    { code: 'LU', name: 'Luxembourg' },
    { code: 'MO', name: 'Macao' },
    { code: 'MK', name: 'Macedonia' },
    { code: 'MG', name: 'Madagascar' },
    { code: 'MW', name: 'Malawi' },
    { code: 'MY', name: 'Malaysia' },
    { code: 'MV', name: 'Maldives' },
    { code: 'ML', name: 'Mali' },
    { code: 'MT', name: 'Malta' },
    { code: 'MH', name: 'Marshall Islands' },
    { code: 'MQ', name: 'Martinique' },
    { code: 'MR', name: 'Mauritania' },
    { code: 'MU', name: 'Mauritius' },
    { code: 'YT', name: 'Mayotte' },
    { code: 'MX', name: 'Mexico' },
    { code: 'FM', name: 'Micronesia, Federated States Of' },
    { code: 'MD', name: 'Moldova' },
    { code: 'MC', name: 'Monaco' },
    { code: 'MN', name: 'Mongolia' },
    { code: 'ME', name: 'Montenegro' },
    { code: 'MS', name: 'Montserrat' },
    { code: 'MA', name: 'Morocco' },
    { code: 'MZ', name: 'Mozambique' },
    { code: 'MM', name: 'Myanmar' },
    { code: 'NA', name: 'Namibia' },
    { code: 'NR', name: 'Nauru' },
    { code: 'NP', name: 'Nepal' },
    { code: 'NL', name: 'Netherlands' },
    { code: 'AN', name: 'Netherlands Antilles' },
    { code: 'NC', name: 'New Caledonia' },
    { code: 'NZ', name: 'New Zealand' },
    { code: 'NI', name: 'Nicaragua' },
    { code: 'NE', name: 'Niger' },
    { code: 'NG', name: 'Nigeria' },
    { code: 'NU', name: 'Niue' },
    { code: 'NF', name: 'Norfolk Island' },
    { code: 'MP', name: 'Northern Mariana Islands' },
    { code: 'NO', name: 'Norway' },
    { code: 'OM', name: 'Oman' },
    { code: 'PK', name: 'Pakistan' },
    { code: 'PW', name: 'Palau' },
    { code: 'PS', name: 'Palestinian Territory, Occupied' },
    { code: 'PA', name: 'Panama' },
    { code: 'PG', name: 'Papua New Guinea' },
    { code: 'PY', name: 'Paraguay' },
    { code: 'PE', name: 'Peru' },
    { code: 'PH', name: 'Philippines' },
    { code: 'PN', name: 'Pitcairn' },
    { code: 'PL', name: 'Poland' },
    { code: 'PT', name: 'Portugal' },
    { code: 'PR', name: 'Puerto Rico' },
    { code: 'QA', name: 'Qatar' },
    { code: 'RE', name: 'Reunion' },
    { code: 'RO', name: 'Romania' },
    { code: 'RU', name: 'Russian Federation' },
    { code: 'RW', name: 'Rwanda' },
    { code: 'BL', name: 'Saint Barthelemy' },
    { code: 'SH', name: 'Saint Helena' },
    { code: 'KN', name: 'Saint Kitts And Nevis' },
    { code: 'LC', name: 'Saint Lucia' },
    { code: 'MF', name: 'Saint Martin' },
    { code: 'PM', name: 'Saint Pierre And Miquelon' },
    { code: 'VC', name: 'Saint Vincent And Grenadines' },
    { code: 'WS', name: 'Samoa' },
    { code: 'SM', name: 'San Marino' },
    { code: 'ST', name: 'Sao Tome And Principe' },
    { code: 'SA', name: 'Saudi Arabia' },
    { code: 'SN', name: 'Senegal' },
    { code: 'RS', name: 'Serbia' },
    { code: 'SC', name: 'Seychelles' },
    { code: 'SL', name: 'Sierra Leone' },
    { code: 'SG', name: 'Singapore' },
    { code: 'SK', name: 'Slovakia' },
    { code: 'SI', name: 'Slovenia' },
    { code: 'SB', name: 'Solomon Islands' },
    { code: 'SO', name: 'Somalia' },
    { code: 'ZA', name: 'South Africa' },
    { code: 'GS', name: 'South Georgia And Sandwich Isl.' },
    { code: 'ES', name: 'Spain' },
    { code: 'LK', name: 'Sri Lanka' },
    { code: 'SD', name: 'Sudan' },
    { code: 'SR', name: 'Suriname' },
    { code: 'SJ', name: 'Svalbard And Jan Mayen' },
    { code: 'SZ', name: 'Swaziland' },
    { code: 'SE', name: 'Sweden' },
    { code: 'CH', name: 'Switzerland' },
    { code: 'SY', name: 'Syrian Arab Republic' },
    { code: 'TW', name: 'Taiwan' },
    { code: 'TJ', name: 'Tajikistan' },
    { code: 'TZ', name: 'Tanzania' },
    { code: 'TH', name: 'Thailand' },
    { code: 'TL', name: 'Timor-Leste' },
    { code: 'TG', name: 'Togo' },
    { code: 'TK', name: 'Tokelau' },
    { code: 'TO', name: 'Tonga' },
    { code: 'TT', name: 'Trinidad And Tobago' },
    { code: 'TN', name: 'Tunisia' },
    { code: 'TR', name: 'Turkey' },
    { code: 'TM', name: 'Turkmenistan' },
    { code: 'TC', name: 'Turks And Caicos Islands' },
    { code: 'TV', name: 'Tuvalu' },
    { code: 'UG', name: 'Uganda' },
    { code: 'UA', name: 'Ukraine' },
    { code: 'AE', name: 'United Arab Emirates' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'US', name: 'United States' },
    { code: 'UM', name: 'United States Outlying Islands' },
    { code: 'UY', name: 'Uruguay' },
    { code: 'UZ', name: 'Uzbekistan' },
    { code: 'VU', name: 'Vanuatu' },
    { code: 'VE', name: 'Venezuela' },
    { code: 'VN', name: 'Viet Nam' },
    { code: 'VG', name: 'Virgin Islands, British' },
    { code: 'VI', name: 'Virgin Islands, U.S.' },
    { code: 'WF', name: 'Wallis And Futuna' },
    { code: 'EH', name: 'Western Sahara' },
    { code: 'YE', name: 'Yemen' },
    { code: 'ZM', name: 'Zambia' },
    { code: 'ZW', name: 'Zimbabwe' },
]

const listOfAcceptedIndustryCategories = [
    {
        value: 'ACCOUNTING_AUDITING_AND_BOOKKEEPING_SERVICES',
        view: 'ACCOUNTING AUDITING AND BOOKKEEPING SERVICES',
    },
    { value: 'ADVERTISING_SERVICES', view: 'ADVERTISING SERVICES' },
    { value: 'AGRICULTURAL_COOPERATIVES', view: 'AGRICULTURAL COOPERATIVES' },
    {
        value: 'ALCOHOLIC_BEVERAGE_WHOLESALERS',
        view: 'ALCOHOLIC BEVERAGE WHOLESALERS',
    },
    {
        value: 'AMUSEMENT_PARKS_CIRCUSES_CARNIVALS_AND_FORTUNE_TELLERS',
        view: 'AMUSEMENT PARKS CIRCUSES CARNIVALS AND FORTUNE TELLERS',
    },
    { value: 'ANTIQUE_REPRODUCTION_SHOPS', view: 'ANTIQUE REPRODUCTION SHOPS' },
    {
        value: 'ARCHITECTURAL_ENGINEERING_AND_SURVEYING_SERVICES',
        view: 'ARCHITECTURAL ENGINEERING AND SURVEYING SERVICES',
    },
    { value: 'ART_AND_CRAFTS_NEW', view: 'ART AND CRAFTS NEW' },
    {
        value: 'ASSET_MANAGEMENT_COMPANY_NEW',
        view: 'ASSET MANAGEMENT COMPANY NEW',
    },
    { value: 'AUCTION', view: 'AUCTION' },
    { value: 'AUTOMATED_FUEL_DISPENSERS', view: 'AUTOMATED FUEL DISPENSERS' },
    { value: 'AUTOMOBILE_RENTALS', view: 'AUTOMOBILE RENTALS' },
    {
        value: 'AUTOMOTIVE_BODY_REPAIR_SHOPS',
        view: 'AUTOMOTIVE BODY REPAIR SHOPS',
    },
    {
        value: 'AUTOMOTIVE_CAR_MOTORCYCLE_BOATS_AND_MISCELLANEOUS_AUTOMOTIVE_EQUIPMENT_DEALER',
        view: 'AUTOMOTIVE CAR MOTORCYCLE BOATS AND MISCELLANEOUS AUTOMOTIVE EQUIPMENT DEALER',
    },
    {
        value: 'AUTOMOTIVE_PARTS_AND_ACCESSORIES_OUTLETS',
        view: 'AUTOMOTIVE PARTS AND ACCESSORIES OUTLETS',
    },
    {
        value: 'AUTOMOTIVE_REPAIR_WASHES_AND_TOWING_SERVICE',
        view: 'AUTOMOTIVE REPAIR WASHES AND TOWING SERVICE',
    },
    { value: 'BAKERIES', view: 'BAKERIES' },
    { value: 'BANKS', view: 'BANKS' },
    { value: 'BEAUTY_AND_BARBER_SHOPS', view: 'BEAUTY AND BARBER SHOPS' },
    {
        value: 'BILLIARD_AND_POOL_ESTABLISHMENTS',
        view: 'BILLIARD AND POOL ESTABLISHMENTS',
    },
    {
        value: 'BOAT_RENTAL_MARINAS_AND_MARINE_SERVICE_INC_SUPPLIES',
        view: 'BOAT RENTAL MARINAS AND MARINE SERVICE INC SUPPLIES',
    },
    { value: 'BOOKS_AND_STATIONARY', view: 'BOOKS AND STATIONARY' },
    {
        value: 'BUSINESS_AND_SECRETARIAL_SCHOOLS',
        view: 'BUSINESS AND SECRETARIAL SCHOOLS',
    },
    {
        value: 'BUYING_AND_SHOPPING_SERVICES_AND_CLUBS',
        view: 'BUYING AND SHOPPING SERVICES AND CLUBS',
    },
    {
        value: 'CABLE_AND_OTHER_PAY_TELEVISION_SERVICES',
        view: 'CABLE AND OTHER PAY TELEVISION SERVICES',
    },
    {
        value: 'CAMERA_AND_PHOTOGRAPHIC_SUPPLY_SHOPS',
        view: 'CAMERA AND PHOTOGRAPHIC SUPPLY SHOPS',
    },
    {
        value: 'CAR_AND_TRUCK_DEALERS_SALES_SERVICES_REPAIRS_PARTS_AND_LEASING',
        view: 'CAR AND TRUCK DEALERS SALES SERVICES REPAIRS PARTS AND LEASING',
    },
    {
        value: 'CARPET_AND_UPHOLSTERY_CLEANING',
        view: 'CARPET AND UPHOLSTERY CLEANING',
    },
    { value: 'CATERERS', view: 'CATERERS' },
    {
        value: 'CHARITABLE_AND_SOCIAL_SERVICE_ORGANIZATIONS',
        view: 'CHARITABLE AND SOCIAL SERVICE ORGANIZATIONS',
    },
    { value: 'CHILD_CARE_SERVICES', view: 'CHILD CARE SERVICES' },
    { value: 'CHIROPRACTORS', view: 'CHIROPRACTORS' },
    { value: 'CIGAR_SHOPS_AND_STANDS', view: 'CIGAR SHOPS AND STANDS' },
    {
        value: 'CIVIC_SOCIAL_AND_FRATERNAL_ASSOCIATIONS',
        view: 'CIVIC SOCIAL AND FRATERNAL ASSOCIATIONS',
    },
    {
        value: 'CLEANING_MAINTENANCE_AND_JANITORIAL_SERVICES',
        view: 'CLEANING MAINTENANCE AND JANITORIAL SERVICES',
    },
    {
        value: 'CLOTHING_RENTALS_COSTUMES_UNIFORMS_AND_FORMAL_WEAR',
        view: 'CLOTHING RENTALS COSTUMES UNIFORMS AND FORMAL WEAR',
    },
    { value: 'CLOTHING_STORES', view: 'CLOTHING STORES' },
    {
        value: 'COMMERCIAL_PHOTOGRAPHY_ART_AND_GRAPHICS',
        view: 'COMMERCIAL PHOTOGRAPHY ART AND GRAPHICS',
    },
    {
        value: 'COMPUTER_NETWORKINFORMATION_SERVICES',
        view: 'COMPUTER NETWORKINFORMATION SERVICES',
    },
    { value: 'COMPUTER_SOFTWARE_OUTLETS', view: 'COMPUTER SOFTWARE OUTLETS' },
    {
        value: 'CONSUMER_CREDIT_REPORTING_AGENCIES',
        view: 'CONSUMER CREDIT REPORTING AGENCIES',
    },
    {
        value: 'CONTRACTORS_STONEWORK_INSULATION_CAPENTRY_ROOFING_CONCRETE_OTHER',
        view: 'CONTRACTORS STONEWORK INSULATION CAPENTRY ROOFING CONCRETE OTHER',
    },
    { value: 'CORRESPONDENCE_SCHOOLS', view: 'CORRESPONDENCE SCHOOLS' },
    {
        value: 'COSMETIC_SHOPS_EXISTING_BRAND',
        view: 'COSMETIC SHOPS EXISTING BRAND',
    },
    { value: 'COSMETIC_SHOPS_OWN_BRAND', view: 'COSMETIC SHOPS OWN BRAND' },
    {
        value: 'COUNSELLING_SERVICES_DEBT_MARRIAGE_AND_PERSONAL',
        view: 'COUNSELLING SERVICES DEBT MARRIAGE AND PERSONAL',
    },
    { value: 'CRYPTOCURRENCY', view: 'CRYPTOCURRENCY' },
    {
        value: 'DANCE_HALLS_STUDIOS_AND_SCHOOLS',
        view: 'DANCE HALLS STUDIOS AND SCHOOLS',
    },
    { value: 'DATING_AND_ESCORT_SERVICES', view: 'DATING AND ESCORT SERVICES' },
    {
        value: 'DEALSITES_NON_DIGITAL_VOUCHER',
        view: 'DEALSITES NON DIGITAL VOUCHER',
    },
    { value: 'DEALSITES_SELLING_EVOUCHER', view: 'DEALSITES SELLING EVOUCHER' },
    {
        value: 'DENTAL_LABORATORY_MEDICAL_OPHTHALMIC_HOSPITAL_EQUIPMENT_AND_SUPPLIES',
        view: 'DENTAL LABORATORY MEDICAL OPHTHALMIC HOSPITAL EQUIPMENT AND SUPPLIES',
    },
    { value: 'DENTISTS', view: 'DENTISTS' },
    { value: 'DEPARTMENT_STORES', view: 'DEPARTMENT STORES' },
    {
        value: 'DETECTIVE_AGENCIES_PROTECTIVE_AGENCIES_AND_SECURITY_SERVICES_INCLUDING_ARMOURED_CARS_AND_GUARD_DOGS',
        view: 'DETECTIVE AGENCIES PROTECTIVE AGENCIES AND SECURITY SERVICES INCLUDING ARMOURED CARS AND GUARD DOGS',
    },
    { value: 'DIGITAL_GOODS', view: 'DIGITAL GOODS' },
    {
        value: 'DIRECT_MARKETING_CATALOGUE_MERCHANTS',
        view: 'DIRECT MARKETING CATALOGUE MERCHANTS',
    },
    {
        value: 'DIRECT_MARKETING_COMBINATION_CATALOGUE_AND_RETAIL_MERCHANTS',
        view: 'DIRECT MARKETING COMBINATION CATALOGUE AND RETAIL MERCHANTS',
    },
    {
        value: 'DIRECT_MARKETING_CONTINUITYSUBSCRIPTION_MERCHANTS',
        view: 'DIRECT MARKETING CONTINUITYSUBSCRIPTION MERCHANTS',
    },
    {
        value: 'DIRECT_MARKETING_INBOUND_TELEMARKETING_MERCHANTS',
        view: 'DIRECT MARKETING INBOUND TELEMARKETING MERCHANTS',
    },
    {
        value: 'DIRECT_MARKETING_INSURANCE_SERVICES',
        view: 'DIRECT MARKETING INSURANCE SERVICES',
    },
    {
        value: 'DIRECT_MARKETING_OUTBOUND_TELEMARKETING_MERCHANTS',
        view: 'DIRECT MARKETING OUTBOUND TELEMARKETING MERCHANTS',
    },
    { value: 'DISCOUNT_SHOPS', view: 'DISCOUNT SHOPS' },
    { value: 'DOORTODOOR_SALES', view: 'DOORTODOOR SALES' },
    {
        value: 'DRAPERY_WINDOW_COVERING_UPHOLSTERY_FIREPLACES_FIREPLACE_SCREENS_AND_ACCESSORIES_SHOPS',
        view: 'DRAPERY WINDOW COVERING UPHOLSTERY FIREPLACES FIREPLACE SCREENS AND ACCESSORIES SHOPS',
    },
    {
        value: 'DRINKING_PLACES_ALCOHOLIC_BEVERAGES_BARS_TAVERNS_NIGHTCLUBS_COCKTAIL_LOUNGES_AND_DISCOTHQUES',
        view: 'DRINKING PLACES ALCOHOLIC BEVERAGES BARS TAVERNS NIGHTCLUBS COCKTAIL LOUNGES AND DISCOTHQUES',
    },
    { value: 'DRUG_STORES_AND_PHARMACIES', view: 'DRUG STORES AND PHARMACIES' },
    { value: 'DRUGS_DRUG_PROPRIETORS', view: 'DRUGS DRUG PROPRIETORS' },
    { value: 'DUTYFREE_SHOPS', view: 'DUTYFREE SHOPS' },
    {
        value: 'EATING_PLACES_AND_RESTAURANTS',
        view: 'EATING PLACES AND RESTAURANTS',
    },
    { value: 'ECOMMERCE', view: 'ECOMMERCE' },
    {
        value: 'ELECTRIC_RAZOR_SHOPS_SALES_AND_SERVICE',
        view: 'ELECTRIC RAZOR SHOPS SALES AND SERVICE',
    },
    { value: 'ELECTRIC_VEHICLE_CHARGING', view: 'ELECTRIC VEHICLE CHARGING' },
    {
        value: 'ELECTRONICS_AND_ACCESSORIES_NEW',
        view: 'ELECTRONICS AND ACCESSORIES NEW',
    },
    { value: 'ELECTRONICS_REPAIR_SHOPS', view: 'ELECTRONICS REPAIR SHOPS' },
    {
        value: 'EMPLOYMENT_AGENCIES_AND_TEMPORARY_HELP_SERVICES',
        view: 'EMPLOYMENT AGENCIES AND TEMPORARY HELP SERVICES',
    },
    {
        value: 'EQUIPMENT_TOOL_FURNITURE_AND_APPLIANCE_RENTALS_AND_LEASING',
        view: 'EQUIPMENT TOOL FURNITURE AND APPLIANCE RENTALS AND LEASING',
    },
    { value: 'EWALLETS', view: 'EWALLETS' },
    {
        value: 'EXTERMINATING_AND_DISINFECTING_SERVICES',
        view: 'EXTERMINATING AND DISINFECTING SERVICES',
    },
    { value: 'FAST_FOOD_RESTAURANTS', view: 'FAST FOOD RESTAURANTS' },
    {
        value: 'FINANCIAL_INSTITUTIONS_AUTOMATED_CASH_DISBURSEMENTS',
        view: 'FINANCIAL INSTITUTIONS AUTOMATED CASH DISBURSEMENTS',
    },
    {
        value: 'FINANCIAL_INSTITUTIONS_MANUAL_CASH_DISBURSEMENTS',
        view: 'FINANCIAL INSTITUTIONS MANUAL CASH DISBURSEMENTS',
    },
    {
        value: 'FINANCIAL_INSTITUTIONS_MERCHANDISE_AND_SERVICES',
        view: 'FINANCIAL INSTITUTIONS MERCHANDISE AND SERVICES',
    },
    {
        value: 'FIREPLACES_FIREPLACE_SCREENS_AND_ACCESSORIES_SHOPS',
        view: 'FIREPLACES FIREPLACE SCREENS AND ACCESSORIES SHOPS',
    },
    { value: 'FLOOR_COVERING_SERVICES', view: 'FLOOR COVERING SERVICES' },
    { value: 'FLORISTS', view: 'FLORISTS' },
    {
        value: 'FLORISTS_SUPPLIES_NURSERY_STOCK_AND_FLOWERS',
        view: 'FLORISTS SUPPLIES NURSERY STOCK AND FLOWERS',
    },
    {
        value: 'FUEL_DEALERS_FUEL_OIL_WOOD_COAL_AND_LIQUEFIED_PETROLEUM',
        view: 'FUEL DEALERS FUEL OIL WOOD COAL AND LIQUEFIED PETROLEUM',
    },
    {
        value: 'FUNERAL_SERVICES_AND_CREMATORIUMS',
        view: 'FUNERAL SERVICES AND CREMATORIUMS',
    },
    {
        value: 'FURNITURE_HOME_FURNISHINGS_AND_EQUIPMENT_SHOPS_AND_MANUFACTURERS_EXCEPT_APPLIANCES',
        view: 'FURNITURE HOME FURNISHINGS AND EQUIPMENT SHOPS AND MANUFACTURERS EXCEPT APPLIANCES',
    },
    {
        value: 'GENERAL_CONTRACTORS_RESIDENTIAL_AND_COMMERCIAL',
        view: 'GENERAL CONTRACTORS RESIDENTIAL AND COMMERCIAL',
    },
    {
        value: 'GIFT_CARD_NOVELTY_AND_SOUVENIR_SHOPS',
        view: 'GIFT CARD NOVELTY AND SOUVENIR SHOPS',
    },
    {
        value: 'GLASSWARE_AND_CRYSTAL_SHOPS',
        view: 'GLASSWARE AND CRYSTAL SHOPS',
    },
    { value: 'HAJ_AND_UMRAH_PROVIDER_NEW', view: 'HAJ AND UMRAH PROVIDER NEW' },
    { value: 'HEALTH_AND_BEAUTY_SPAS', view: 'HEALTH AND BEAUTY SPAS' },
    {
        value: 'HEALTH_SUPPLEMENT_SELLING_OWN_BRAND',
        view: 'HEALTH SUPPLEMENT SELLING OWN BRAND',
    },
    {
        value: 'HEARING_AIDS_ORTHOPAEDIC_GOODS_AND_PROSTHETIC_DEVICES_SALES_SERVICE_AND_SUPPLIES',
        view: 'HEARING AIDS ORTHOPAEDIC GOODS AND PROSTHETIC DEVICES SALES SERVICE AND SUPPLIES',
    },
    {
        value: 'HEATING_PLUMBING_AND_AIRCONDITIONING_CONTRACTORS',
        view: 'HEATING PLUMBING AND AIRCONDITIONING CONTRACTORS',
    },
    { value: 'HOBBY_TOY_AND_GAME_SHOPS', view: 'HOBBY TOY AND GAME SHOPS' },
    {
        value: 'HOME_SUPPLY_HARDWARE_AND_OTHER_BUILDING_MATERIALS',
        view: 'HOME SUPPLY HARDWARE AND OTHER BUILDING MATERIALS',
    },
    { value: 'HOSPITALS', view: 'HOSPITALS' },
    {
        value: 'HOUSEHOLD_APPLICANCES_HOME_FURNISHING_AND_ELECTRONICS_SHOPS',
        view: 'HOUSEHOLD APPLICANCES HOME FURNISHING AND ELECTRONICS SHOPS',
    },
    {
        value: 'INSURANCE_SALES_UNDERWRITING_AND_PREMIUMS',
        view: 'INSURANCE SALES UNDERWRITING AND PREMIUMS',
    },
    { value: 'INSURTECH', view: 'INSURTECH' },
    {
        value: 'INTERNET_SERVICE_PROVIDER_NEW',
        view: 'INTERNET SERVICE PROVIDER NEW',
    },
    { value: 'INVESTMENT_SERVICES_NEW', view: 'INVESTMENT SERVICES NEW' },
    { value: 'IT_SERVICES_NEW', view: 'IT SERVICES NEW' },
    {
        value: 'JEWELLERY_WATCH_CLOCK_AND_SILVERWARE_SHOPS',
        view: 'JEWELLERY WATCH CLOCK AND SILVERWARE SHOPS',
    },
    {
        value: 'LANDSCAPING_AND_HORTICULTURAL_SERVICES',
        view: 'LANDSCAPING AND HORTICULTURAL SERVICES',
    },
    {
        value: 'LAUNDRY_CLEANING_AND_GARMENT_SERVICES',
        view: 'LAUNDRY CLEANING AND GARMENT SERVICES',
    },
    {
        value: 'LAWN_AND_GARDEN_SUPPLIES_OUTLETS_INCLUDING_NURSERIES',
        view: 'LAWN AND GARDEN SUPPLIES OUTLETS INCLUDING NURSERIES',
    },
    {
        value: 'LEGAL_SERVICES_AND_ATTORNEYS',
        view: 'LEGAL SERVICES AND ATTORNEYS',
    },
    { value: 'LENDING', view: 'LENDING' },
    {
        value: 'LOCAL_AND_SUBURBAN_COMMUTER_PASSENGER_TRANSPORTATION_INCLUDING_FERRIES',
        view: 'LOCAL AND SUBURBAN COMMUTER PASSENGER TRANSPORTATION INCLUDING FERRIES',
    },
    {
        value: 'LODGING_HOTELS_MOTELS_AND_RESORTS',
        view: 'LODGING HOTELS MOTELS AND RESORTS',
    },
    {
        value: 'LUGGAGE_AND_LEATHER_GOODS_SHOPS',
        view: 'LUGGAGE AND LEATHER GOODS SHOPS',
    },
    {
        value: 'MANAGEMENT_CONSULTING_AND_PUBLIC_RELATIONS_SERVICES',
        view: 'MANAGEMENT CONSULTING AND PUBLIC RELATIONS SERVICES',
    },
    { value: 'MARKETPLACE_NEW', view: 'MARKETPLACE NEW' },
    { value: 'MASSAGE_PARLOURS', view: 'MASSAGE PARLOURS' },
    {
        value: 'MEDICAL_AND_DENTAL_LABORATORIES',
        view: 'MEDICAL AND DENTAL LABORATORIES',
    },
    {
        value: 'MEMBERSHIP_CLUBS_SPORTS_RECREATION_ATHLETIC_COUNTRY_CLUBS_AND_PRIVATE_GOLF_COURSES',
        view: 'MEMBERSHIP CLUBS SPORTS RECREATION ATHLETIC COUNTRY CLUBS AND PRIVATE GOLF COURSES',
    },
    {
        value: 'METAL_SERVICE_CENTRES_AND_OFFICES',
        view: 'METAL SERVICE CENTRES AND OFFICES',
    },
    {
        value: 'MISCELLANEOUS_AND_SPECIALITY_RETAIL_OUTLETS',
        view: 'MISCELLANEOUS AND SPECIALITY RETAIL OUTLETS',
    },
    {
        value: 'MISCELLANEOUS_APPAREL_AND_ACCESSORY_SHOPS',
        view: 'MISCELLANEOUS APPAREL AND ACCESSORY SHOPS',
    },
    {
        value: 'MISCELLANEOUS_FOOD_SHOPS_CONVENIENCE_AND_SPECIALITY_RETAIL_OUTLETS',
        view: 'MISCELLANEOUS FOOD SHOPS CONVENIENCE AND SPECIALITY RETAIL OUTLETS',
    },
    {
        value: 'MISCELLANEOUS_GENERAL_MERCHANDISE',
        view: 'MISCELLANEOUS GENERAL MERCHANDISE',
    },
    {
        value: 'MISCELLANEOUS_REPAIR_SHOPS_AND_RELATED_SERVICES',
        view: 'MISCELLANEOUS REPAIR SHOPS AND RELATED SERVICES',
    },
    { value: 'MOBILE_HOME_DEALERS', view: 'MOBILE HOME DEALERS' },
    {
        value: 'MONTHLY_SUMMARY_TELEPHONE_CHARGES',
        view: 'MONTHLY SUMMARY TELEPHONE CHARGES',
    },
    { value: 'MOTION_PICTURE_THEATRES', view: 'MOTION PICTURE THEATRES' },
    {
        value: 'MOTOR_FREIGHT_CARRIERS_AND_TRUCKING_LOCAL_AND_LONG_DISTANCE_MOVING_AND_STORAGE_COMPANIES_AND_LOCAL_DELIVERY',
        view: 'MOTOR FREIGHT CARRIERS AND TRUCKING LOCAL AND LONG DISTANCE MOVING AND STORAGE COMPANIES AND LOCAL DELIVERY',
    },
    {
        value: 'MOTOR_VEHICLE_SUPPLIES_AND_NEW_PARTS',
        view: 'MOTOR VEHICLE SUPPLIES AND NEW PARTS',
    },
    { value: 'MULTI_FINANCE_COMPANY', view: 'MULTI FINANCE COMPANY' },
    { value: 'MULTI_LEVEL_MARKETING_NEW', view: 'MULTI LEVEL MARKETING NEW' },
    {
        value: 'MUSIC_SHOPS_MUSICAL_INSTRUMENTS_PIANOS_AND_SHEET_MUSIC',
        view: 'MUSIC SHOPS MUSICAL INSTRUMENTS PIANOS AND SHEET MUSIC',
    },
    { value: 'NEWSAGENTS_AND_NEWSSTANDS', view: 'NEWSAGENTS AND NEWSSTANDS' },
    {
        value: 'NON_FINANCIAL_INSTITUTIONS_FOREIGN_CURRENCY_MONEY_ORDERS_NOT_WIRE_TRANSFER_SCRIP_AND_TRAVELLERS_CHECKS',
        view: 'NON FINANCIAL INSTITUTIONS FOREIGN CURRENCY MONEY ORDERS NOT WIRE TRANSFER SCRIP AND TRAVELLERS CHECKS',
    },
    {
        value: 'NURSING_AND_PERSONAL_CARE_FACILITIES',
        view: 'NURSING AND PERSONAL CARE FACILITIES',
    },
    {
        value: 'OFFICE_AND_COMMERCIAL_FURNITURE',
        view: 'OFFICE AND COMMERCIAL FURNITURE',
    },
    {
        value: 'OFFICE_PHOTOGRAPHIC_COMMERCIAL_EQUIPMENT_AND_OTHER_INDUSTRIAL_SUPPLIES',
        view: 'OFFICE PHOTOGRAPHIC COMMERCIAL EQUIPMENT AND OTHER INDUSTRIAL SUPPLIES',
    },
    {
        value: 'OPTICIANS_OPTICAL_GOODS_AND_EYEGLASSES',
        view: 'OPTICIANS OPTICAL GOODS AND EYEGLASSES',
    },
    {
        value: 'OPTOMETRISTS_AND_OPHTHALMOLOGISTS',
        view: 'OPTOMETRISTS AND OPHTHALMOLOGISTS',
    },
    { value: 'OSTEOPATHS', view: 'OSTEOPATHS' },
    { value: 'OTHER_BUSINESS_SERVICES', view: 'OTHER BUSINESS SERVICES' },
    {
        value: 'OTHER_CHEMICALS_AND_ALLIED_PRODUCTS',
        view: 'OTHER CHEMICALS AND ALLIED PRODUCTS',
    },
    {
        value: 'OTHER_CONSTRUCTION_MATERIALS',
        view: 'OTHER CONSTRUCTION MATERIALS',
    },
    {
        value: 'OTHER_DIRECT_MARKETINGDIRECT_MARKETERS',
        view: 'OTHER DIRECT MARKETINGDIRECT MARKETERS',
    },
    {
        value: 'OTHER_DOCTORS_AND_PHYSICIANS',
        view: 'OTHER DOCTORS AND PHYSICIANS',
    },
    { value: 'OTHER_DURABLE_GOODS', view: 'OTHER DURABLE GOODS' },
    { value: 'OTHER_GOVERNMENT_SERVICES', view: 'OTHER GOVERNMENT SERVICES' },
    {
        value: 'OTHER_MEDICAL_SERVICES_AND_HEALTH_PRACTITIONERS',
        view: 'OTHER MEDICAL SERVICES AND HEALTH PRACTITIONERS',
    },
    {
        value: 'OTHER_MEMBERSHIP_ORGANIZATIONS',
        view: 'OTHER MEMBERSHIP ORGANIZATIONS',
    },
    {
        value: 'OTHER_MISCELLANEOUS_PERSONAL_SERVICES',
        view: 'OTHER MISCELLANEOUS PERSONAL SERVICES',
    },
    { value: 'OTHER_NONDURABLE_GOODS', view: 'OTHER NONDURABLE GOODS' },
    {
        value: 'OTHER_PROFESSIONAL_SERVICES',
        view: 'OTHER PROFESSIONAL SERVICES',
    },
    { value: 'OTHER_RECREATION_SERVICES', view: 'OTHER RECREATION SERVICES' },
    {
        value: 'OTHER_TRANSPORTATION_SERVICES',
        view: 'OTHER TRANSPORTATION SERVICES',
    },
    {
        value: 'PACKAGE_SHOPS_BEER_WINE_AND_LIQUOR',
        view: 'PACKAGE SHOPS BEER WINE AND LIQUOR',
    },
    { value: 'PARKING_LOTS_AND_GARAGES', view: 'PARKING LOTS AND GARAGES' },
    { value: 'PAWN_SHOPS', view: 'PAWN SHOPS' },
    { value: 'PAYMENT_GATEWAY_NEW', view: 'PAYMENT GATEWAY NEW' },
    { value: 'PEERTOPEER_LENDING', view: 'PEERTOPEER LENDING' },
    {
        value: 'PET_SHOPS_PET_FOOD_AND_SUPPLIES',
        view: 'PET SHOPS PET FOOD AND SUPPLIES',
    },
    {
        value: 'PETROLEUM_AND_PETROLEUM_PRODUCTS',
        view: 'PETROLEUM AND PETROLEUM PRODUCTS',
    },
    {
        value: 'PHOTOFINISHING_LABORATORIES_AND_PHOTO_DEVELOPING',
        view: 'PHOTOFINISHING LABORATORIES AND PHOTO DEVELOPING',
    },
    { value: 'PHOTOGRAPHIC_STUDIOS', view: 'PHOTOGRAPHIC STUDIOS' },
    {
        value: 'PIECE_GOODS_NOTIONS_AND_OTHER_DRY_GOODS',
        view: 'PIECE GOODS NOTIONS AND OTHER DRY GOODS',
    },
    {
        value: 'PLUMBING_AND_HEATING_EQUIPMENT_AND_SUPPLIES',
        view: 'PLUMBING AND HEATING EQUIPMENT AND SUPPLIES',
    },
    {
        value: 'PODIATRISTS_AND_CHIROPODISTS',
        view: 'PODIATRISTS AND CHIROPODISTS',
    },
    { value: 'POLITICAL_ORGANIZATIONS', view: 'POLITICAL ORGANIZATIONS' },
    {
        value: 'PRECIOUS_STONES_AND_METALS_WATCHES_AND_JEWELLERY',
        view: 'PRECIOUS STONES AND METALS WATCHES AND JEWELLERY',
    },
    {
        value: 'PUBLIC_WAREHOUSING_AND_STORAGE_FARM_PRODUCTS_REFRIGERATED_GOODS_AND_HOUSEHOLD_GOODS',
        view: 'PUBLIC WAREHOUSING AND STORAGE FARM PRODUCTS REFRIGERATED GOODS AND HOUSEHOLD GOODS',
    },
    {
        value: 'REAL_ESTATE_AGENTS_AND_MANAGERS',
        view: 'REAL ESTATE AGENTS AND MANAGERS',
    },
    { value: 'RECORD_SHOPS', view: 'RECORD SHOPS' },
    { value: 'RELIGIOUS_GOODS_AND_SHOPS', view: 'RELIGIOUS GOODS AND SHOPS' },
    { value: 'RELIGIOUS_ORGANIZATIONS', view: 'RELIGIOUS ORGANIZATIONS' },
    { value: 'REMITTANCE_NEW', view: 'REMITTANCE NEW' },
    { value: 'RIDE_SHARING_NEW', view: 'RIDE SHARING NEW' },
    {
        value: 'SCHOOLS_UNIVERSITY_AND_EDUCATIONAL_SERVICE_INC_TRADE_AND_VOCATIONAL_SCHOOL',
        view: 'SCHOOLS UNIVERSITY AND EDUCATIONAL SERVICE INC TRADE AND VOCATIONAL SCHOOL',
    },
    {
        value: 'SECURITIES_BROKERS_AND_DEALERS',
        view: 'SECURITIES BROKERS AND DEALERS',
    },
    {
        value: 'SERVICE_STATIONS_WITH_OR_WITHOUT_ANCILLARY_SERVICES',
        view: 'SERVICE STATIONS WITH OR WITHOUT ANCILLARY SERVICES',
    },
    {
        value: 'SEWING_NEEDLEWORK_FABRIC_AND_PIECE_GOODS_SHOPS',
        view: 'SEWING NEEDLEWORK FABRIC AND PIECE GOODS SHOPS',
    },
    {
        value: 'SHOE_REPAIR_SHOPS_SHOE_SHINE_PARLOURS_AND_HAT_CLEANING_SHOPS',
        view: 'SHOE REPAIR SHOPS SHOE SHINE PARLOURS AND HAT CLEANING SHOPS',
    },
    { value: 'SHOE_SHOPS', view: 'SHOE SHOPS' },
    {
        value: 'SPECIALITY_CLEANING_POLISHING_AND_SANITATION_PREPARATIONS',
        view: 'SPECIALITY CLEANING POLISHING AND SANITATION PREPARATIONS',
    },
    {
        value: 'SPORTING_AND_RECREATIONAL_CAMPS',
        view: 'SPORTING AND RECREATIONAL CAMPS',
    },
    { value: 'SPORTING_GOODS_NEW', view: 'SPORTING GOODS NEW' },
    {
        value: 'SPORTS_AND_RIDING_APPAREL_SHOPS',
        view: 'SPORTS AND RIDING APPAREL SHOPS',
    },
    {
        value: 'SUPERMARKET_CONVENIENCE_STORES_CONFECTIONERY_SHOPS_AND_BUTCHERY',
        view: 'SUPERMARKET CONVENIENCE STORES CONFECTIONERY SHOPS AND BUTCHERY',
    },
    {
        value: 'SWIMMING_POOLS_SALES_SUPPLIES_AND_SERVICES',
        view: 'SWIMMING POOLS SALES SUPPLIES AND SERVICES',
    },
    {
        value: 'TAILORS_SEAMSTRESSES_MENDING_AND_ALTERATIONS',
        view: 'TAILORS SEAMSTRESSES MENDING AND ALTERATIONS',
    },
    { value: 'TAX_PAYMENTS', view: 'TAX PAYMENTS' },
    { value: 'TAX_PREPARATION_SERVICES', view: 'TAX PREPARATION SERVICES' },
    { value: 'TAXICABS_AND_LIMOUSINES', view: 'TAXICABS AND LIMOUSINES' },
    {
        value: 'TELECOMMUNICATION_EQUIPMENT_AND_TELEPHONE_SALES',
        view: 'TELECOMMUNICATION EQUIPMENT AND TELEPHONE SALES',
    },
    {
        value: 'TELECOMMUNICATION_SERVICES_INCLUDING_LOCAL_AND_LONG_DISTANCE_CALLS_CREDIT_CARD_CALLS_CALLS_THROUGH_USE_OF_MAGNETIC_STRIPE_READING_TELEPHONES_AND_FAXES',
        view: 'TELECOMMUNICATION SERVICES INCLUDING LOCAL AND LONG DISTANCE CALLS CREDIT CARD CALLS CALLS THROUGH USE OF MAGNETIC STRIPE READING TELEPHONES AND FAXES',
    },
    { value: 'TELEGRAPH_SERVICES', view: 'TELEGRAPH SERVICES' },
    {
        value: 'TELEMARKETING_TRAVEL_RELATED_ARRANGEMENT_SERVICES',
        view: 'TELEMARKETING TRAVEL RELATED ARRANGEMENT SERVICES',
    },
    { value: 'TENT_AND_AWNING_SHOPS', view: 'TENT AND AWNING SHOPS' },
    {
        value: 'TESTING_LABORATORIES_NONMEDICAL',
        view: 'TESTING LABORATORIES NONMEDICAL',
    },
    {
        value: 'THEATRICAL_PRODUCERS_EXCEPT_MOTION_PICTURES_AND_TICKET_AGENCIES',
        view: 'THEATRICAL PRODUCERS EXCEPT MOTION PICTURES AND TICKET AGENCIES',
    },
    { value: 'TIMESHARES', view: 'TIMESHARES' },
    { value: 'TOLLS_AND_BRIDGE_FEES', view: 'TOLLS AND BRIDGE FEES' },
    {
        value: 'TOURIST_ATTRACTIONS_AND_EXHIBITS',
        view: 'TOURIST ATTRACTIONS AND EXHIBITS',
    },
    {
        value: 'TRAILER_PARKS_AND_CAMPSITES',
        view: 'TRAILER PARKS AND CAMPSITES',
    },
    {
        value: 'TRAINING_ONLINE_INCLASS_SHORT_COURSES',
        view: 'TRAINING ONLINE INCLASS SHORT COURSES',
    },
    {
        value: 'TRAVEL_AGENCIES_AND_TOUR_OPERATORS',
        view: 'TRAVEL AGENCIES AND TOUR OPERATORS',
    },
    {
        value: 'TRUCK_AND_UTILITY_TRAILER_RENTALS',
        view: 'TRUCK AND UTILITY TRAILER RENTALS',
    },
    {
        value: 'TYPEWRITER_OUTLETS_SALES_SERVICE_AND_RENTALS',
        view: 'TYPEWRITER OUTLETS SALES SERVICE AND RENTALS',
    },
    {
        value: 'UNIFORM_AND_COMMERCIAL_CLOTHING',
        view: 'UNIFORM AND COMMERCIAL CLOTHING',
    },
    {
        value: 'UTILITIES_ELECTRIC_GAS_WATER_AND_SANITARY',
        view: 'UTILITIES ELECTRIC GAS WATER AND SANITARY',
    },
    { value: 'VETERINARY_SERVICES', view: 'VETERINARY SERVICES' },
    {
        value: 'VIDEO_AMUSEMENT_GAME_SUPPLIES',
        view: 'VIDEO AMUSEMENT GAME SUPPLIES',
    },
    {
        value: 'VIDEO_GAME_ARCADES_AND_ESTABLISHMENTS',
        view: 'VIDEO GAME ARCADES AND ESTABLISHMENTS',
    },
    { value: 'VIDEO_TAPE_RENTALS', view: 'VIDEO TAPE RENTALS' },
    { value: 'WELDING_SERVICES', view: 'WELDING SERVICES' },
    {
        value: 'WIRE_TRANSFERS_AND_MONEY_ORDERS',
        view: 'WIRE TRANSFERS AND MONEY ORDERS',
    },
    { value: 'WRECKING_AND_SALVAGE_YARDS', view: 'WRECKING AND SALVAGE YARDS' },
    { value: 'ZAKAT_COLLECTION_NEW', view: 'ZAKAT COLLECTION NEW' },
]

const tab = ref(3)

const completedSteps = ref([])
const isTabEnabled = tabNumber => {
    if (tabNumber === 1) return true
    if (tabNumber === 2) return completedSteps.value.includes(1)
    if (tabNumber === 3) return completedSteps.value.includes(2)
    return false
}

const completeStep = stepNumber => {
    if (!completedSteps.value.includes(stepNumber)) {
        completedSteps.value.push(stepNumber)
        if (stepNumber !== 3) {
            tab.value++
        }
    } else {
        tab.value++
    }
}

const fileStore = useFileStore()
const fileInput = ref(null)
const idFile = ref('')
const uploadedFile = ref(null)
const filePreviewUrl = ref('')
const isUploading = ref(false)
const uploadError = ref('')

// Computed properties
const uploadedFileName = computed(() => {
    return uploadedFile.value?.name || 'Uploaded file'
})

const uploadedFileSize = computed(() => {
    return uploadedFile.value?.size || 0
})

const isImageFile = computed(() => {
    return uploadedFile.value?.type.startsWith('image/') || false
})

// Methods
const triggerFileInput = () => {
    fileInput.value.click()
}

const handleFileUpload = async event => {
    const file = event.target.files[0]
    if (!file) return

    // Reset state
    uploadError.value = ''
    isUploading.value = true
    
    uploadedFile.value = file
    
    // Create preview URL for images
    if (file.type.startsWith('image/')) {
        filePreviewUrl.value = URL.createObjectURL(file)
    }

    const formData = new FormData()
    formData.append('file', file)

    try {
        const response = await fileStore.post(formData)
        
        // Debug: Log response untuk melihat struktur data
        console.log('Upload response:', response)
        
        if (response) {
            idFile.value = response.id || 
                          response.fileId || 
                          response.data?.id || 
                          response.data?.fileId ||
                          response.file?.id ||
                          `temp-${Date.now()}`
        } else {
            idFile.value = `temp-${Date.now()}`
            console.warn('Upload response is undefined, using temporary ID')
        }
        
        console.log('File uploaded successfully, ID:', idFile.value)
        
    } catch (error) {
        console.error('File upload failed:', error)
        uploadError.value = 'Failed to upload file. Please try again.'
        // Reset state karena upload gagal
        removeFile()
    } finally {
        isUploading.value = false
    }
}

const editFile = () => {
    // Trigger file input untuk memilih file baru
    triggerFileInput()
}

const removeFile = () => {
    // Clean up preview URL if it exists
    if (filePreviewUrl.value) {
        URL.revokeObjectURL(filePreviewUrl.value)
    }
    
    idFile.value = ''
    uploadedFile.value = null
    filePreviewUrl.value = ''
    uploadError.value = ''
    isUploading.value = false
    
    // Reset file input
    if (fileInput.value) {
        fileInput.value.value = ''
    }
}

const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
const shortenFileName = (fileName, maxLength = 25) => {
    if (!fileName) return ''
    
    if (fileName.length <= maxLength) {
        return fileName
    }
    
    const extension = fileName.split('.').pop()
    const nameWithoutExtension = fileName.slice(0, -(extension.length + 1))
    
    // Jika nama file tanpa ekstensi masih terlalu panjang
    const charsEachSide = Math.floor((maxLength - extension.length - 3) / 2) // 3 untuk "..."
    
    const start = nameWithoutExtension.slice(0, charsEachSide)
    const end = nameWithoutExtension.slice(-charsEachSide)
    
    return `${start}...${end}.${extension}`
}

</script>
<template>
    <div
        class="w-full h-screen fixed z-[99999999] p-10 bg-black/10 backdrop-blur-sm flex items-center justify-center">
        <div
            class="flex w-full h-full bg-ezzora-50 dark:bg-dark-primary-2 border dark:border-white rounded-xl px-10 py-5 max-w-4xl">
            <div class="h-full border-r pr-10 flex-none text-xs">
                <ul class="space-y-5">
                    <li class="flex items-center gap-2">
                        <div
                            :class="
                                user !== null ? 'text-white !bg-green-500' : ''
                            "
                            class="rounded-full w-6 h-6 border dark:border-typography-1 flex items-center justify-center">
                            <i class="fa-solid fa-check"></i>
                        </div>
                        <p class="dark:text-white">Create your account</p>
                    </li>
                    <li class="flex items-center gap-2">
                        <div
                            :class="
                                user?.store?.status_kyc == null
                                    ? 'border-dashed'
                                    : ''
                            "
                            class="rounded-full w-6 h-6 border dark:border-typography-1 flex items-center justify-center">
                            <i
                                class=""
                                :class="
                                    user?.store?.status_kyc == 'VERIFIED'
                                        ? 'fa-solid fa-check'
                                        : ''
                                "></i>
                        </div>
                        <p class="dark:text-white">Complete activation form</p>
                    </li>
                </ul>
            </div>
            <!-- <KYCVerification /> -->
            <div
                v-if="user?.store?.status_kyc == null"
                class="h-full pl-10 w-full">
                <div class="dark:text-white h-full">
                    <div class="w-full flex flex-col h-full">
                        <v-tabs
                            v-model="tab"
                            align-tabs="center"
                            grow="true"
                            height="auto">
                            <v-tab :value="1">
                                <div
                                    class="pt-1 pb-3 flex flex-col justify-center items-center gap-2">
                                    <div
                                        class="border rounded-full w-7 h-7 border-white flex items-center justify-center">
                                        <p>1</p>
                                    </div>
                                    <p>Business Details</p>
                                </div>
                            </v-tab>
                            <v-tab :value="2" :disabled="!isTabEnabled(2)">
                                <div
                                    class="pt-1 pb-3 flex flex-col justify-center items-center gap-2">
                                    <div
                                        class="border rounded-full w-7 h-7 border-white flex items-center justify-center">
                                        <p>2</p>
                                    </div>
                                    <p>Individual Details</p>
                                </div>
                            </v-tab>
                            <v-tab :value="3" :disabled="!isTabEnabled(3)">
                                <div
                                    class="pt-1 pb-3 flex flex-col justify-center items-center gap-2">
                                    <div
                                        class="border rounded-full w-7 h-7 border-white flex items-center justify-center">
                                        <p>3</p>
                                    </div>
                                    <p>Verification</p>
                                </div>
                            </v-tab>
                        </v-tabs>
                        <v-tabs-window v-model="tab" class="h-full">
                            <v-tabs-window-item :value="1" class="h-full">
                                <div
                                    class="flex w-full h-full overflow-y-scroll invisible-scrollbar !py-5 !px-1">
                                    <form
                                        class="w-full"
                                        @submit.prevent="completeStep(1)">
                                        <div
                                            class="space-y-3 w-full h-full relative overflow-y-auto invisible-scrollbar">
                                            <div
                                                class="flex flex-col gap-2 text-sm">
                                                <label
                                                    class="dark:text-light-primary-1"
                                                    for="type"
                                                    >Type Of Business</label
                                                >
                                                <select
                                                    id="type"
                                                    v-model="
                                                        form.bussiness_detail
                                                            .type
                                                    "
                                                    class="text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                                    required>
                                                    <option
                                                        value=""
                                                        selected
                                                        disabled>
                                                        Select Type Of Business
                                                    </option>
                                                    <option value="CORPORATION">
                                                        Corporation
                                                    </option>
                                                    <option value="PARTNERSHIP">
                                                        Partnership
                                                    </option>
                                                    <option
                                                        value="SOLE_PROPRIETORSHIP">
                                                        Sole Proprietorship
                                                    </option>
                                                    <option value="INDIVIDUAL">
                                                        Individual
                                                    </option>
                                                </select>
                                            </div>
                                            <div
                                                class="flex flex-col gap-2 text-sm">
                                                <label
                                                    class="dark:text-light-primary-1"
                                                    for="legal_name"
                                                    >Legal Name</label
                                                >
                                                <input
                                                    id="legal_name"
                                                    v-model="
                                                        form.bussiness_detail
                                                            .legal_name
                                                    "
                                                    class="text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                                    type="text"
                                                    placeholder="Enter Business Legal Name"
                                                    required />
                                            </div>
                                            <div
                                                class="flex flex-col gap-2 text-sm">
                                                <label
                                                    class="dark:text-light-primary-1"
                                                    for="trading_name"
                                                    >Business Name</label
                                                >
                                                <input
                                                    id="trading_name"
                                                    v-model="
                                                        form.bussiness_detail
                                                            .trading_name
                                                    "
                                                    class="text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                                    type="text"
                                                    placeholder="Enter Business/Brand Name"
                                                    required />
                                            </div>
                                            <div
                                                class="flex flex-col gap-2 text-sm">
                                                <label
                                                    class="dark:text-light-primary-1"
                                                    for="description"
                                                    >Description</label
                                                >
                                                <textarea
                                                    id="description"
                                                    v-model="
                                                        form.bussiness_detail
                                                            .description
                                                    "
                                                    class="text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                                    type="text"
                                                    placeholder="Description of the business"
                                                    rows="3"
                                                    required>
                              ></textarea
                                                >
                                            </div>
                                            <div
                                                class="flex flex-col gap-2 text-sm">
                                                <label
                                                    class="dark:text-light-primary-1"
                                                    for="industry_category"
                                                    >Industry Category</label
                                                >
                                                <multiselect
                                                    v-model="
                                                        form.bussiness_detail
                                                            .industry_category
                                                    "
                                                    :options="
                                                        listOfAcceptedIndustryCategories
                                                    "
                                                    :searchable="true"
                                                    :close-on-select="true"
                                                    label="view"
                                                    :multiple="false"
                                                    track-by="view"
                                                    :preserve-search="true"
                                                    placeholder=" Select Industry Category"
                                                    :required="true" />
                                            </div>
                                            <div
                                                class="flex flex-col gap-2 text-sm">
                                                <label
                                                    class="dark:text-light-primary-1"
                                                    for="date_of_registration"
                                                    >Date Of Registration</label
                                                >
                                                <input
                                                    id="date_of_registration"
                                                    v-model="
                                                        form.bussiness_detail
                                                            .date_of_registration
                                                    "
                                                    class="text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                                    type="date"
                                                    placeholder="Enter Date Of Registration"
                                                    required />
                                            </div>
                                            <div
                                                class="flex flex-col gap-2 text-sm">
                                                <label
                                                    class="dark:text-light-primary-1"
                                                    for="country_of_operation"
                                                    >Country Of Operation</label
                                                >
                                                <select
                                                    id="country_of_operation"
                                                    v-model="
                                                        form.bussiness_detail
                                                            .country_of_operation
                                                    "
                                                    class="text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                                    required>
                                                    >
                                                    <option
                                                        value=""
                                                        disabled
                                                        selected>
                                                        Select Country Of
                                                        Operation
                                                    </option>
                                                    <option value="ID">
                                                        Indonesia
                                                    </option>
                                                    <option value="PH">
                                                        Philippines
                                                    </option>
                                                    <option value="VN">
                                                        Vietnam
                                                    </option>
                                                    <option value="MY">
                                                        Malaysia
                                                    </option>
                                                    <option value="TH">
                                                        Thailand
                                                    </option>
                                                </select>
                                            </div>
                                            <div
                                                class="flex justify-end sticky bottom-0 pt-3 dark:bg-dark-primary-2">
                                                <button
                                                    class="bg-green-200 text-green-700 px-5 py-1 text-sm rounded-lg"
                                                    type="submit">
                                                    Next
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </v-tabs-window-item>
                            <v-tabs-window-item :value="2" class="h-full">
                                <div
                                    class="flex w-full h-full overflow-y-scroll invisible-scrollbar !py-5 !px-1">
                                    <form
                                        class="w-full"
                                        @submit.prevent="completeStep(2)">
                                        <div
                                            class="space-y-3 w-full h-full relative overflow-y-auto invisible-scrollbar px-1">
                                            <div
                                                class="flex flex-col gap-2 text-sm">
                                                <label
                                                    class="dark:text-light-primary-1"
                                                    for="type"
                                                    >Individual Type</label
                                                >
                                                <select
                                                    id="type"
                                                    v-model="
                                                        form.individual_details
                                                            .type
                                                    "
                                                    class="text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                                    required>
                                                    <option
                                                        value=""
                                                        selected
                                                        disabled>
                                                        Select Type Of
                                                        Individual
                                                    </option>
                                                    <option value="PIC">
                                                        PIC
                                                    </option>
                                                    <option
                                                        value="Incorporator">
                                                        Incorporator
                                                    </option>
                                                </select>
                                            </div>
                                            <div
                                                class="flex flex-col gap-2 text-sm">
                                                <label
                                                    class="dark:text-light-primary-1"
                                                    for="given_names"
                                                    >Given Names</label
                                                >
                                                <input
                                                    id="given_names"
                                                    v-model="
                                                        form.individual_details
                                                            .given_names
                                                    "
                                                    class="text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                                    type="text"
                                                    placeholder="Enter Your Given Names"
                                                    required />
                                            </div>
                                            <div
                                                class="flex flex-col gap-2 text-sm">
                                                <label
                                                    class="dark:text-light-primary-1"
                                                    for="surname"
                                                    >Surname</label
                                                >
                                                <input
                                                    id="surname"
                                                    v-model="
                                                        form.individual_details
                                                            .surname
                                                    "
                                                    class="text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                                    type="text"
                                                    placeholder="Enter Your Surname"
                                                    required />
                                            </div>
                                            <div
                                                class="flex flex-col gap-2 text-sm dark">
                                                <label
                                                    class="dark:text-light-primary-1"
                                                    for="phone_number"
                                                    >Phone Number</label
                                                >
                                                <vue-tel-input
                                                    id="phone_number"
                                                    v-model="phone_number"
                                                    class="text-sm !rounded-lg bg-light-primary-1 w-full hover:!dark:bg-dark-primary-2 dark:!bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3 dark:dark-theme"
                                                    mode="international"
                                                    default-country="ID"
                                                    :auto-format="true"
                                                    :enable-long-numbers="true"
                                                    :dropdown-options="{
                                                        showSearchBox: true,
                                                        showFlags: true,
                                                    }"
                                                    :input-options="{
                                                        styleClasses:
                                                            'bg-dark-primary-1',
                                                        required: true,
                                                        type: 'tel',
                                                    }"
                                                    :valid-characters-only="
                                                        true
                                                    "
                                                    @on-input="
                                                        phoneNumberInput
                                                    " />
                                                <p
                                                    v-if="
                                                        phone_number_data?.valid ===
                                                        false
                                                    "
                                                    class="text-xs text-red-500">
                                                    Invalid Format Phone Number
                                                </p>
                                            </div>
                                            <div
                                                class="flex flex-col gap-2 text-sm">
                                                <label
                                                    class="dark:text-light-primary-1"
                                                    for="email"
                                                    >Email</label
                                                >
                                                <input
                                                    id="email"
                                                    v-model="
                                                        form.individual_details
                                                            .email
                                                    "
                                                    class="text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                                    type="email"
                                                    placeholder="Enter Your E-Mail Address"
                                                    required />
                                            </div>
                                            <div
                                                class="flex flex-col gap-2 text-sm">
                                                <label
                                                    class="dark:text-light-primary-1"
                                                    for="nationality"
                                                    >Nationality</label
                                                >
                                                <multiselect
                                                    v-model="
                                                        form.individual_details
                                                            .nationality
                                                    "
                                                    :options="countryArray"
                                                    :searchable="true"
                                                    :close-on-select="true"
                                                    label="name"
                                                    :multiple="false"
                                                    track-by="name"
                                                    :preserve-search="true"
                                                    placeholder="Select Nationality"
                                                    required />
                                            </div>
                                            <div
                                                class="flex flex-col gap-2 text-sm">
                                                <label
                                                    class="dark:text-light-primary-1"
                                                    for="place_of_birth"
                                                    >Place Of Birth</label
                                                >
                                                <input
                                                    id="place_of_birth"
                                                    v-model="
                                                        form.individual_details
                                                            .place_of_birth
                                                    "
                                                    class="text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                                    type="text"
                                                    placeholder="Enter Your Place Of Birth"
                                                    required />
                                            </div>
                                            <div
                                                class="flex flex-col gap-2 text-sm">
                                                <label
                                                    class="dark:text-light-primary-1"
                                                    for="date_of_birth"
                                                    >Date Of Birth</label
                                                >
                                                <input
                                                    id="date_of_birth"
                                                    v-model="
                                                        form.individual_details
                                                            .date_of_birth
                                                    "
                                                    class="text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                                    type="date"
                                                    required />
                                            </div>
                                            <div
                                                class="flex flex-col gap-2 text-sm">
                                                <label
                                                    class="dark:text-light-primary-1"
                                                    for="gender"
                                                    >Gender</label
                                                >
                                                <select
                                                    id="gender"
                                                    v-model="
                                                        form.individual_details
                                                            .gender
                                                    "
                                                    class="text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                                    required>
                                                    <option
                                                        :value="null"
                                                        selected
                                                        disabled>
                                                        Select Gender
                                                    </option>
                                                    <option value="Male">
                                                        MALE
                                                    </option>
                                                    <option value="Female">
                                                        FEMALE
                                                    </option>
                                                    <option value="Other">
                                                        OTHER
                                                    </option>
                                                </select>
                                            </div>
                                            <fieldset
                                                class="border border-typography-2 rounded-lg text-sm p-5 space-y-3 w-full">
                                                <legend class="p-5">
                                                    Address
                                                </legend>
                                                <div
                                                    class="flex flex-col gap-2 text-sm !-mt-5">
                                                    <label
                                                        class="dark:text-light-primary-1"
                                                        for="country"
                                                        >Country</label
                                                    >
                                                    <select
                                                        id="country"
                                                        v-model="
                                                            form.address.country
                                                        "
                                                        class="text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                                        required>
                                                        <option
                                                            :value="null"
                                                            selected
                                                            disabled>
                                                            Select Country
                                                        </option>
                                                        <option value="ID">
                                                            Indonesia
                                                        </option>
                                                        <option value="PH">
                                                            Philippines
                                                        </option>
                                                        <option value="VN">
                                                            Vietnam
                                                        </option>
                                                        <option value="MY">
                                                            Malaysia
                                                        </option>
                                                        <option value="TH">
                                                            Thailand
                                                        </option>
                                                    </select>
                                                </div>
                                                <div
                                                    class="flex flex-col gap-2 text-sm">
                                                    <label
                                                        class="dark:text-light-primary-1"
                                                        for="city"
                                                        >City</label
                                                    >
                                                    <input
                                                        id="city"
                                                        v-model="
                                                            form.address.city
                                                        "
                                                        type="text"
                                                        placeholder="Enter City"
                                                        class="text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                                        required />
                                                </div>
                                                <div
                                                    class="flex flex-col gap-2 text-sm">
                                                    <label
                                                        class="dark:text-light-primary-1"
                                                        for="province_state"
                                                        >Province State</label
                                                    >
                                                    <input
                                                        id="province_state"
                                                        v-model="
                                                            form.address
                                                                .province_state
                                                        "
                                                        type="text"
                                                        placeholder="Enter Province State"
                                                        class="text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                                        required />
                                                </div>
                                                <div
                                                    class="flex flex-col gap-2 text-sm">
                                                    <label
                                                        class="dark:text-light-primary-1"
                                                        for="street_line1"
                                                        >Street Line 1</label
                                                    >
                                                    <input
                                                        id="street_line1"
                                                        v-model="
                                                            form.address
                                                                .street_line1
                                                        "
                                                        type="text"
                                                        placeholder="Enter Street Line 1"
                                                        class="text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                                        required />
                                                </div>
                                                <div
                                                    class="flex flex-col gap-2 text-sm">
                                                    <label
                                                        class="dark:text-light-primary-1"
                                                        for="street_line2"
                                                        >Street Line 2</label
                                                    >
                                                    <input
                                                        id="street_line2"
                                                        v-model="
                                                            form.address
                                                                .street_line2
                                                        "
                                                        type="text"
                                                        placeholder="Enter Street Line 2"
                                                        class="text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                                        required />
                                                </div>
                                                <div
                                                    class="flex flex-col gap-2 text-sm">
                                                    <label
                                                        class="dark:text-light-primary-1"
                                                        for="district"
                                                        >District</label
                                                    >
                                                    <input
                                                        id="district"
                                                        v-model="
                                                            form.address
                                                                .district
                                                        "
                                                        type="text"
                                                        placeholder="Enter District"
                                                        class="text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                                        required />
                                                </div>
                                                <div
                                                    class="flex flex-col gap-2 text-sm">
                                                    <label
                                                        class="dark:text-light-primary-1"
                                                        for="sub_district"
                                                        >Sub District</label
                                                    >
                                                    <input
                                                        id="sub_district"
                                                        v-model="
                                                            form.address
                                                                .sub_district
                                                        "
                                                        type="text"
                                                        placeholder="Enter Sub District"
                                                        class="text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                                        required />
                                                </div>
                                                <div
                                                    class="flex flex-col gap-2 text-sm">
                                                    <label
                                                        class="dark:text-light-primary-1"
                                                        for="postal_code"
                                                        >Postal Code</label
                                                    >
                                                    <input
                                                        id="postal_code"
                                                        v-model="
                                                            form.address
                                                                .postal_code
                                                        "
                                                        type="number"
                                                        placeholder="Enter Postal Code"
                                                        class="text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                                        required />
                                                </div>
                                            </fieldset>

                                            <div
                                                class="flex justify-end sticky bottom-0 pt-3 dark:bg-dark-primary-2">
                                                <button
                                                    class="bg-green-200 text-green-700 px-5 py-1 text-sm rounded-lg"
                                                    type="submit">
                                                    Next
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </v-tabs-window-item>
         <v-tabs-window-item :value="3" class="h-full">
        <div class="flex w-full h-full overflow-y-scroll invisible-scrollbar !py-5 !px-1">
            <div class="w-full h-full dark:bg-dark-primary-2 rounded-xl relative max-w-sm mx-auto">
                <img :src="KYCImage" class="w-full max-w-40 mx-auto" alt="" />
                <div class="px-5 py-3">
                    <p class="dark:text-white text-center text-2xl font-semibold font-poppins tracking-widest">
                        Let's Verify KYC
                    </p>
                </div>
                <form @submit.prevent="completeStep(3)">
                    <div class="space-y-3">
                        <button
                            type="button"
                            class="flex gap-5 items-center p-3 w-full"
                            @click="triggerFileInput"
                            :disabled="isUploading"
                        >
                            <i class="fa-solid fa-id-card !text-3xl text-gray-600 dark:text-gray-300"></i>
                            <div class="w-full text-left">
                                <p class="text-sm font-medium dark:text-white">
                                    Take a Picture of Your Valid ID
                                </p>
                                <p class="text-xs font-light text-gray-500 dark:text-gray-400">
                                    To check your personal informations are correct
                                </p>
                            </div>
                            <i 
                                class="fa-solid text-gray-400"
                                :class="idFile ? 'fa-check-circle text-green-500' : 'fa-chevron-right'"
                            ></i>
                        </button>
                        
                        <!-- File Preview -->
                        <div v-if="idFile" class="mt-4 p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center space-x-3">
                                    <i class="fa-solid fa-file text-blue-500 text-xl"></i>
                                    <div>
                                        <p class="text-sm font-medium dark:text-white">{{ shortenFileName(uploadedFileName) }}</p>
                                        <p class="text-xs text-gray-500 dark:text-gray-400">
                                            {{ formatFileSize(uploadedFileSize) }}
                                        </p>
                                    </div>
                                </div>
                                <div class="flex items-center space-x-2">
                                    <!-- Tombol Edit -->
                                    <button
                                        type="button"
                                        @click="editFile"
                                        class="text-blue-500 hover:text-blue-700 transition-colors"
                                        :disabled="isUploading"
                                    >
                                        <i class="fa-solid fa-pen-to-square text-lg"></i>
                                    </button>
                                    <!-- Tombol Hapus -->
                                    <button
                                        type="button"
                                        @click="removeFile"
                                        class="text-red-500 hover:text-red-700 transition-colors"
                                        :disabled="isUploading"
                                    >
                                        <i class="fa-solid fa-times text-lg"></i>
                                    </button>
                                </div>
                            </div>
                            
                            <!-- Image Preview -->
                            <div v-if="isImageFile" class="mt-3">
                                <img 
                                    :src="filePreviewUrl" 
                                    alt="Preview" 
                                    class="w-full object-contain rounded-lg border border-gray-200 dark:border-gray-600"
                                    :style="{ maxHeight: previewImageHeight + 'px' }"/>
                            </div>
                        </div>

                        <!-- Loading State -->
                        <div v-if="isUploading" class="mt-4 p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
                            <div class="flex items-center space-x-3">
                                <i class="fa-solid fa-spinner fa-spin text-blue-500 text-xl"></i>
                                <div>
                                    <p class="text-sm font-medium dark:text-white">Uploading file...</p>
                                    <p class="text-xs text-gray-500 dark:text-gray-400">Please wait</p>
                                </div>
                            </div>
                        </div>

                        <!-- Error Message -->
                        <div v-if="uploadError" class="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                            <p class="text-sm">{{ uploadError }}</p>
                        </div>

                        <input
                            ref="fileInput"
                            type="file"
                            class="hidden"
                            accept="image/*"
                            capture="environment"
                            @change="handleFileUpload"
                        />
                        <input
                            v-model="idFile"
                            type="hidden"
                            name="id_file"
                        />

                        <!-- Submit Button -->
                        <button
                            v-if="idFile && !isUploading"
                            type="submit"
                            class="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-medium transition-colors mt-4"
                        >
                            Complete Verification
                        </button>
                    </div>
                </form>
            </div>
    
                                    <!-- <form
                                        class="w-full"
                                        @submit.prevent="tab++">
                                        <div
                                            class="space-y-3 w-full h-full relative overflow-y-auto invisible-scrollbar px-1">
                                            <div
                                                class="flex flex-col gap-2 text-sm">
                                                <label
                                                    class="dark:text-light-primary-1"
                                                    for="country"
                                                    >Country</label
                                                >
                                                <select
                                                    id="country"
                                                    class="text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                                    required>
                                                    <option value="" disabled>
                                                        Select Country
                                                    </option>
                                                    <option selected value="ID">
                                                        Indonesia
                                                    </option>
                                                </select>
                                            </div>
                                            <div class="pb-10">
                                                <div
                                                    v-if="
                                                        form.bussiness_detail
                                                            .type ==
                                                        'CORPORATION'
                                                    "
                                                    class="!space-y-3">
                                                    <div
                                                        class="flex flex-col gap-2 text-sm">
                                                        <label
                                                            class="dark:text-light-primary-1"
                                                            for="corporation_id_ktp"
                                                            >ID Card</label
                                                        >
                                                        <input
                                                            id="corporation_id_ktp"
                                                            class="!text-xs rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                                            type="file"
                                                            required />
                                                    </div>
                                                    <div
                                                        class="flex flex-col gap-2 text-sm">
                                                        <label
                                                            class="dark:text-light-primary-1"
                                                            for="corporation_id_company_npwp"
                                                            >NPWP Company</label
                                                        >
                                                        <input
                                                            id="corporation_id_company_npwp"
                                                            class="!text-xs rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                                            type="file"
                                                            required />
                                                    </div>
                                                    <div
                                                        class="flex flex-col gap-2 text-sm">
                                                        <label
                                                            class="dark:text-light-primary-1"
                                                            for="corporation_id_nib"
                                                            >NIB</label
                                                        >
                                                        <input
                                                            id="corporation_id_nib"
                                                            class="!text-xs rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                                            type="file"
                                                            required />
                                                    </div>
                                                    <div
                                                        class="flex flex-col gap-2 text-sm">
                                                        <label
                                                            class="dark:text-light-primary-1"
                                                            for="corporation_id_akta"
                                                            >Deed of
                                                            Incorporation</label
                                                        >
                                                        <input
                                                            id="corporation_id_akta"
                                                            class="!text-xs rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                                            type="file"
                                                            required />
                                                    </div>
                                                    <div
                                                        class="flex flex-col gap-2 text-sm">
                                                        <label
                                                            class="dark:text-light-primary-1"
                                                            for="corporation_id_skmenkeh"
                                                            >SKMENKEH</label
                                                        >
                                                        <input
                                                            id="corporation_id_skmenkeh"
                                                            class="!text-xs rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                                            type="file"
                                                            required />
                                                    </div>
                                                </div>
                                                <div
                                                    v-if="
                                                        form.bussiness_detail
                                                            .type ==
                                                        'SOLE_PROPRIETORSHIP'
                                                    "
                                                    class="!space-y-3">
                                                    <div
                                                        class="flex flex-col gap-2 text-sm">
                                                        <label
                                                            class="dark:text-light-primary-1"
                                                            for="sole_proprietorship_id_ktp"
                                                            >ID Card</label
                                                        >
                                                        <input
                                                            id="sole_proprietorship_id_ktp"
                                                            class="!text-xs rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                                            type="file"
                                                            required />
                                                    </div>
                                                    <div
                                                        class="flex flex-col gap-2 text-sm">
                                                        <label
                                                            class="dark:text-light-primary-1"
                                                            for="sole_proprietorship_id_individual_npwp"
                                                            >Individual
                                                            NPWP</label
                                                        >
                                                        <input
                                                            id="sole_proprietorship_id_individual_npwp"
                                                            class="!text-xs rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                                            type="file"
                                                            required />
                                                    </div>
                                                    <div
                                                        class="flex flex-col gap-2 text-sm">
                                                        <label
                                                            class="dark:text-light-primary-1"
                                                            for="sole_proprietorship_id_nib"
                                                            >NIB</label
                                                        >
                                                        <input
                                                            id="sole_proprietorship_id_nib"
                                                            class="!text-xs rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                                            type="file"
                                                            required />
                                                    </div>
                                                    <div
                                                        class="flex flex-col gap-2 text-sm">
                                                        <label
                                                            class="dark:text-light-primary-1"
                                                            for="sole_proprietorship_id_spp_pp"
                                                            >SPP PP</label
                                                        >
                                                        <input
                                                            id="sole_proprietorship_id_spp_pp"
                                                            class="!text-xs rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                                            type="file"
                                                            required />
                                                    </div>
                                                    <div
                                                        class="flex flex-col gap-2 text-sm">
                                                        <label
                                                            class="dark:text-light-primary-1"
                                                            for="sole_proprietorship_id_sert_pp"
                                                            >Sertification
                                                            PP</label
                                                        >
                                                        <input
                                                            id="sole_proprietorship_id_sert_pp"
                                                            class="!text-xs rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                                            type="file"
                                                            required />
                                                    </div>
                                                </div>
                                                <div
                                                    v-if="
                                                        form.bussiness_detail
                                                            .type ==
                                                        'INDIVIDUAL'
                                                    "
                                                    class="!space-y-3">
                                                    <div
                                                        class="flex flex-col gap-2 text-sm">
                                                        <label
                                                            class="dark:text-light-primary-1"
                                                            for="individual_id_card"
                                                            >ID Card</label
                                                        >
                                                        <input
                                                            id="individual_id_card"
                                                            class="!text-xs rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                                            type="file"
                                                            required />
                                                    </div>
                                                    <div
                                                        class="flex flex-col gap-2 text-sm">
                                                        <label
                                                            class="dark:text-light-primary-1"
                                                            for="individual_id_npwp"
                                                            >Individual
                                                            NPWP</label
                                                        >
                                                        <input
                                                            id="individual_id_npwp"
                                                            class="!text-xs rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                                            type="file"
                                                            required />
                                                    </div>
                                                </div>
                                                <div
                                                    v-if="
                                                        form.bussiness_detail
                                                            .type ==
                                                        'PARTNERSHIP'
                                                    "
                                                    class="!space-y-3">
                                                    <div
                                                        class="flex flex-col gap-2 text-sm">
                                                        <label
                                                            class="dark:text-light-primary-1"
                                                            for="partnership_id_card"
                                                            >ID Card</label
                                                        >
                                                        <input
                                                            id="partnership_id_card"
                                                            class="!text-xs rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                                            type="file"
                                                            required />
                                                    </div>
                                                    <div
                                                        class="flex flex-col gap-2 text-sm">
                                                        <label
                                                            class="dark:text-light-primary-1"
                                                            for="partnership_id_company_npwp"
                                                            >NPWP Company</label
                                                        >
                                                        <input
                                                            id="partnership_id_company_npwp"
                                                            class="!text-xs rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                                            type="file"
                                                            required />
                                                    </div>
                                                    <div
                                                        class="flex flex-col gap-2 text-sm">
                                                        <label
                                                            class="dark:text-light-primary-1"
                                                            for="partnership_id_nib"
                                                            >NIB</label
                                                        >
                                                        <input
                                                            id="partnership_id_nib"
                                                            class="!text-xs rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                                            type="file"
                                                            required />
                                                    </div>
                                                    <div
                                                        class="flex flex-col gap-2 text-sm">
                                                        <label
                                                            class="dark:text-light-primary-1"
                                                            for="partnership_id_akta"
                                                            >Deed Of
                                                            Corporation</label
                                                        >
                                                        <input
                                                            id="partnership_id_akta"
                                                            class="!text-xs rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                                            type="file"
                                                            required />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            class="flex justify-end sticky bottom-0 pt-3 dark:bg-dark-primary-2">
                                            <button
                                                class="bg-green-200 text-green-700 px-5 py-1 text-sm rounded-lg"
                                                type="submit">
                                                Next
                                            </button>
                                        </div>
                                    </form> -->
                                </div>
                            </v-tabs-window-item>
                        </v-tabs-window>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
.vti__dropdown:hover,
.vti__dropdown:active,
.vti__dropdown:focus,
.vti__dropdown.open {
    background-color: #1d1d29 !important;
    border-radius: 0.5rem 0 0 0.5rem !important;
}

.dark .vti__dropdown-list {
    padding: 5px;
    background-color: #1d1d29 !important;
    border: 1px solid #11121e;
    border-radius: 8px !important;
}
.dark .vti__dropdown-list::-webkit-scrollbar {
    display: none;
}
.dark .vti__dropdown-item.highlighted {
    background-color: #1d1d29 !important;
    padding: 4px 5px;
}
.dark .vti__dropdown-item {
    background-color: #11121e !important;
    padding: 4px 5px;
}
.dark .vti__dropdown:hover {
    background-color: #1d1d29 !important;
}
.vti__search_box {
    width: 100%;
}
.dark .vti__input.vti__search_box {
    background-color: #1d1d29 !important;
    margin: 0px;
    margin-bottom: 10px;
    font-size: 14px;
    border-radius: 8px !important;
}
.vti__input {
    font-size: 14px;
}
</style>
