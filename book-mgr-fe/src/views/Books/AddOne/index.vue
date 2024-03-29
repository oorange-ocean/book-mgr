<template>
  <div>
    <a-modal open="open" title=" 添加书籍" @ok="summit" >
      <a-form
    :model="formState"
    name="basic"
    :label-col="{ span: 6 }"
    :wrapper-col="{ span:12  }"
    autocomplete="off"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <a-form-item label="书名">
      <a-input v-model:value="addForm.name" />
  </a-form-item>

    <a-form-item label="价格"    >
    <a-input-number v-model:value="addForm.price" id="inputNumber"  :min="1" :max="99999999" />
    </a-form-item>

    <a-form-item label="作者">
      <a-input  v-model:value="addForm.author"/>
    </a-form-item>

    <a-form-item label="出版日期">
    <a-date-picker  v-model:value="addForm.publishDate" />
    </a-form-item>

    <a-form-item label="分类">
      <a-input v-model:value="addForm.classify" />
    </a-form-item>

    
  </a-form>
    </a-modal>
  </div>
  
</template>

<script src="./index.js"> </script>
