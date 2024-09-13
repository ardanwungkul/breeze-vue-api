<script setup>
import AdminLayout from '@/layouts/AdminLayout.vue'
import { onMounted, ref, computed, onBeforeMount } from 'vue'
import { Quill } from '@vueup/vue-quill'
import { QuillEditor } from '@vueup/vue-quill'
import ImageResize from 'quill-image-resize'
import Multiselect from 'vue-multiselect'
import '@/assets/css/vue-multiselect.css'
import '@/assets/css/quill.css'
import { useArticleStore } from '@/stores/article'
import ValidationErrors from '@/components/ValidationErrors.vue'
import Cropper from '@/components/dialog/Cropper.vue'
import { cropper } from 'vue-picture-cropper'
import placeholderImage from '@/assets/images/placeholder-image.jpg'
import { useRoute, useRouter } from 'vue-router'
import LoadingAdmin from '@/components/LoadingAdmin.vue'

Quill.register('modules/imageResize', ImageResize)

const processing = ref(false)
const isLoading = ref(true)
const setErrors = ref([])
const errors = computed(() => setErrors.value)
const store = useArticleStore()
const data = ref({
    category: [],
    tag: [],
    article: null,
})
const croppedImage = ref('')
const showCropper = ref(false)
const form = ref({
    id: null,
    article_title: null,
    article_slug: null,
    article_content: null,
    article_image: null,
    article_image_featured_1: null,
    article_image_featured_1_src: placeholderImage,
    article_image_featured_2: null,
    article_image_featured_2_src: placeholderImage,
    article_image_src: placeholderImage,
    article_view_type: 'Normal',
    article_type: '',
    category_id: null,
    tag: [],
})
const modules = {
    name: 'ImageResize',
    module: ImageResize,
}
const route = useRoute()
const router = useRouter()
const articleId = ref(route.params.id)
const pathImage =
    import.meta.env.VITE_PUBLIC_BACKEND_URL +
    '/storage/images/article/' +
    articleId.value +
    '/'
onBeforeMount(async () => {
    await store.getDataEdit(articleId.value)
    if (store.edit.length !== 0) {
        data.value.category = store.edit.category
        data.value.tag = store.edit.tag
        data.value.article = store.edit.article

        form.value.id = data.value.article.id
        form.value.article_title = data.value.article.article_title
        form.value.article_content = data.value.article.article_content
        if (data.value.article.article_image) {
            form.value.article_image_src =
                pathImage + data.value.article.article_image
        }
        if (data.value.article.article_image_featured_1) {
            form.value.article_image_featured_1_src =
                pathImage + data.value.article.article_image_featured_1
        }
        if (data.value.article.article_image_featured_2) {
            form.value.article_image_featured_2_src =
                pathImage + data.value.article.article_image_featured_2
        }

        form.value.article_view_type = data.value.article.article_view_type
        form.value.article_type = data.value.article.article_type
        form.value.category_id = data.value.article.category
        form.value.tag = data.value.article.tag
        isLoading.value = store.loading
    } else {
        router.replace('/404')
    }
})
function addCategory(newCategory) {
    const category = {
        category_name: newCategory,
    }
    data.value.category.push(category)
    form.value.category_id = category
}
function addTags(newTag) {
    const tag = {
        tag_name: newTag,
    }
    data.value.tag.push(tag)
    form.value.tag.push(tag)
}

const dataURLtoFile = (dataURL, filename) => {
    const [header, base64Data] = dataURL.split(',')
    const mime = header.match(/:(.*?);/)[1]
    const byteString = atob(base64Data)
    const arrayBuffer = new ArrayBuffer(byteString.length)
    const uint8Array = new Uint8Array(arrayBuffer)

    for (let i = 0; i < byteString.length; i++) {
        uint8Array[i] = byteString.charCodeAt(i)
    }

    return new File([uint8Array], filename, { type: mime })
}
const handleCrop = async method => {
    if (method == 'cancel') {
        showCropper.value = false
        form.value.article_image_src = placeholderImage
        form.value.article_image = null
    } else if (method == 'crop') {
        croppedImage.value = cropper.getDataURL()
        const files = dataURLtoFile(croppedImage.value, 'cropper.jpg')
        form.value.article_image = files
        form.value.article_image_src = croppedImage.value
        showCropper.value = false
    }
}
const changePlaceholder = event => {
    const file = event.target.files[0]
    if (file) {
        form.value.article_image_src = URL.createObjectURL(file)
        showCropper.value = true
    }
}
const changePlaceholderFeaturedImage1 = event => {
    const file = event.target.files[0]
    console.log(file)

    if (file) {
        form.value.article_image_featured_1 = file
        form.value.article_image_featured_1_src = URL.createObjectURL(file)
    }
}
const changePlaceholderFeaturedImage2 = event => {
    const file = event.target.files[0]
    if (file) {
        form.value.article_image_featured_2 = file
        form.value.article_image_featured_2_src = URL.createObjectURL(file)
    }
}
const updateArticle = async status => {
    processing.value = true
    const formData = new FormData()
    formData.append('_method', 'PUT')
    if (status == 'publish') {
        formData.append('status', 'publish')
    }

    if (form.value.article_title !== null && form.value.article_title !== '') {
        formData.append('article_title', form.value.article_title)
    }

    if (
        form.value.article_content !== null &&
        form.value.article_content !== ''
    ) {
        formData.append('article_content', form.value.article_content)
    }

    if (form.value.article_type !== null && form.value.article_type !== '') {
        formData.append('article_type', form.value.article_type)
    }

    if (
        form.value.article_view_type !== null &&
        form.value.article_view_type !== ''
    ) {
        formData.append('article_view_type', form.value.article_view_type)
    }

    if (form.value.category_id) {
        formData.append('category_id', form.value.category_id.category_name)
    }
    if (form.value.article_image) {
        formData.append('article_image', form.value.article_image)
    }
    if (form.value.article_image_featured_1) {
        formData.append(
            'article_image_featured_1',
            form.value.article_image_featured_1,
        )
    }
    if (form.value.article_image_featured_2) {
        formData.append(
            'article_image_featured_2',
            form.value.article_image_featured_2,
        )
    }

    if (form.value.tag) {
        form.value.tag.forEach(tag => {
            formData.append('tag[]', tag.tag_name)
        })
    }
    await store.editArticle(formData, setErrors, processing, articleId.value)
}
</script>
<template>
    <AdminLayout title="Edit Articles">
        <LoadingAdmin :isLoading="isLoading" />
        <ValidationErrors class="w-full" :errors="errors" />
        <Cropper
            :showCropper="showCropper"
            :img="form.article_image_src"
            :method="handleCrop"
            :aspect="16 / 9" />
        <div v-if="!isLoading">
            <div class="w-full">
                <div class="py-3">
                    <form>
                        <div class="space-y-3">
                            <div
                                class="border dark:!border-typography-3 dark-primary-2 border-gray-300 p-3 rounded-lg bg-light-primary-1 dark:bg-dark-primary-2 transition-all relative">
                                <div
                                    class="relative flex flex-col items-center justify-center mt-3">
                                    <img
                                        id="picture"
                                        :src="form.article_image_src"
                                        class="object-cover h-32 aspect-video rounded-lg border shadow-lg"
                                        alt="Placeholder Image" />
                                    <div
                                        class="absolute z-50 top-0 hover:!opacity-100 rounded-lg"
                                        style="opacity: 0">
                                        <label for="pictureInput">
                                            <div
                                                class="w-full aspect-video h-32 bg-black opacity-60 flex items-center rounded-lg">
                                                <p class="text-center w-full">
                                                    <i
                                                        class="fa-solid fa-pen"
                                                        style="
                                                            color: #ffffff;
                                                        "></i>
                                                </p>
                                            </div>
                                            <input
                                                accept="image/*"
                                                type="file"
                                                class="absolute bottom-0 opacity-0 w-40 h-2"
                                                id="pictureInput"
                                                required
                                                @change="changePlaceholder" />
                                        </label>
                                    </div>
                                    <p class="dark:text-typography-1 py-1">
                                        Main Image
                                    </p>
                                </div>
                                <div
                                    class="absolute top-3 right-3"
                                    v-if="processing">
                                    <svg
                                        role="status"
                                        class="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                        viewBox="0 0 100 101"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                            fill="currentColor" />
                                        <path
                                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                            fill="currentFill" />
                                    </svg>
                                </div>
                                <div
                                    class="grid grid-cols-2 gap-x-3 p-3 gap-y-5">
                                    <div
                                        class="flex flex-col gap-2 text-sm col-span-2">
                                        <label
                                            class="dark:text-light-primary-1"
                                            for="article_title"
                                            >Title</label
                                        >
                                        <input
                                            class="text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3"
                                            type="text"
                                            v-model="form.article_title"
                                            id="article_title"
                                            placeholder="Enter Title" />
                                    </div>
                                    <div
                                        class="flex flex-col gap-2 text-sm col-span-2">
                                        <label
                                            class="dark:text-light-primary-1"
                                            for="article_content"
                                            >Content</label
                                        >
                                        <QuillEditor
                                            v-model:content="
                                                form.article_content
                                            "
                                            :modules="modules"
                                            contentType="html"
                                            id="article_content"
                                            class="bg-light-primary-1 dark:bg-dark-primary-1 dark:text-typography-1 dark:!border-dark-primary-1 relative h-auto rounded-lg min-h-40 border shadow-lg"
                                            placeholder="Enter Article Content"
                                            toolbar="full"></QuillEditor>
                                    </div>
                                    <div
                                        class="flex flex-col gap-2 text-sm col-span-1">
                                        <label
                                            class="dark:text-light-primary-1"
                                            for="article_type"
                                            >Article Type</label
                                        >
                                        <select
                                            @change="postDraft"
                                            class="text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3 h-10"
                                            v-model="form.article_type"
                                            id="article_type">
                                            <option value="" selected disabled>
                                                Select Article Type
                                            </option>
                                            <option value="Article">
                                                Article
                                            </option>
                                            <option value="Headline">
                                                Headline
                                            </option>
                                        </select>
                                    </div>
                                    <div class="flex flex-col gap-2 text-sm">
                                        <label class="dark:text-light-primary-1"
                                            >Category</label
                                        >
                                        <multiselect
                                            @close="postDraft"
                                            v-model="form.category_id"
                                            :options="data.category"
                                            :searchable="true"
                                            :close-on-select="false"
                                            label="category_name"
                                            track-by="category_name"
                                            :preserve-search="true"
                                            :taggable="true"
                                            @tag="addCategory"
                                            placeholder="Select Categories"></multiselect>
                                    </div>
                                    <div
                                        class="flex flex-col gap-2 text-sm col-span-2">
                                        <label
                                            class="dark:text-light-primary-1"
                                            for="tag"
                                            >Tag</label
                                        >
                                        <multiselect
                                            @close="postDraft"
                                            v-model="form.tag"
                                            :options="data.tag"
                                            :searchable="true"
                                            :multiple="true"
                                            :close-on-select="false"
                                            label="tag_name"
                                            track-by="tag_name"
                                            :preserve-search="true"
                                            :taggable="true"
                                            @tag="addTags"
                                            placeholder="Select Tags"></multiselect>
                                    </div>
                                    <div
                                        class="flex flex-col gap-2 text-sm col-span-2">
                                        <label
                                            class="dark:text-light-primary-1"
                                            for="article_type"
                                            >View Type</label
                                        >
                                        <select
                                            @change="postDraft"
                                            class="text-sm rounded-lg bg-light-primary-1 w-full dark:bg-dark-primary-1 dark:text-light-primary-1 border !border-gray-500 dark:!border-typography-3 h-10"
                                            v-model="form.article_view_type"
                                            id="article_view_type"
                                            required>
                                            <option value="Banner">
                                                Banner
                                            </option>
                                            <option value="Highlight">
                                                Highlight
                                            </option>
                                            <option value="Normal" selected>
                                                Normal
                                            </option>
                                        </select>
                                    </div>
                                    <fieldset
                                        v-if="
                                            form.article_view_type ==
                                            'Highlight'
                                        "
                                        class="border rounded-lg p-5 col-span-2 !border-typography-2 shadow-lg">
                                        <legend
                                            class="dark:text-typography-1 text-sm px-3">
                                            Featured Image
                                        </legend>
                                        <div class="space-y-5">
                                            <div
                                                class="relative flex gap-3 items-center justify-center mt-3">
                                                <div class="relative">
                                                    <img
                                                        id="picture1"
                                                        :src="
                                                            form.article_image_featured_1_src
                                                        "
                                                        class="object-cover h-32 w-32 rounded-lg border shadow-lg"
                                                        alt="Placeholder Image" />
                                                    <div
                                                        class="absolute z-50 top-0 hover:!opacity-100 rounded-lg"
                                                        style="opacity: 0">
                                                        <label
                                                            for="inputFeateuredImage-1">
                                                            <div
                                                                class="h-32 w-32 bg-black opacity-60 flex items-center rounded-lg">
                                                                <p
                                                                    class="text-center w-full">
                                                                    <i
                                                                        class="fa-solid fa-pen"
                                                                        style="
                                                                            color: #ffffff;
                                                                        "></i>
                                                                </p>
                                                            </div>
                                                            <input
                                                                accept="image/*"
                                                                type="file"
                                                                class="absolute bottom-0 opacity-0 w-40 h-2"
                                                                id="inputFeateuredImage-1"
                                                                required
                                                                @change="
                                                                    changePlaceholderFeaturedImage1
                                                                " />
                                                        </label>
                                                    </div>
                                                </div>
                                                <div class="relative">
                                                    <img
                                                        id="picture2"
                                                        :src="
                                                            form.article_image_featured_2_src
                                                        "
                                                        class="object-cover h-32 w-32 rounded-lg border shadow-lg"
                                                        alt="Placeholder Image" />
                                                    <div
                                                        class="absolute z-50 top-0 hover:!opacity-100 rounded-lg"
                                                        style="opacity: 0">
                                                        <label
                                                            for="inputFeateuredImage-2">
                                                            <div
                                                                class="h-32 w-32 bg-black opacity-60 flex items-center rounded-lg">
                                                                <p
                                                                    class="text-center w-full">
                                                                    <i
                                                                        class="fa-solid fa-pen"
                                                                        style="
                                                                            color: #ffffff;
                                                                        "></i>
                                                                </p>
                                                            </div>
                                                            <input
                                                                accept="image/*"
                                                                type="file"
                                                                class="absolute bottom-0 opacity-0 w-40 h-2"
                                                                id="inputFeateuredImage-2"
                                                                required
                                                                @change="
                                                                    changePlaceholderFeaturedImage2
                                                                " />
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                            </div>
                            <div class="flex gap-4 items-center">
                                <button
                                    v-if="
                                        data.article.article_status == 'draft'
                                    "
                                    type="button"
                                    @click="updateArticle('publish')"
                                    class="bg-secondary-3 hover:bg-opacity-90 !text-light-primary-1 px-3 py-2 rounded-lg text-sm cursor-pointer flex justify-center items-center gap-3">
                                    <i class="fa-solid fa-check"></i>
                                    <p>Publish</p>
                                </button>
                                <button
                                    type="button"
                                    @click="updateArticle('draft')"
                                    class="bg-secondary-2 hover:bg-opacity-90 !text-light-primary-1 px-3 py-2 rounded-lg text-sm cursor-pointer flex justify-center items-center gap-3">
                                    <i class="fa-solid fa-file-check"></i>
                                    <p>Save</p>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </AdminLayout>
</template>
