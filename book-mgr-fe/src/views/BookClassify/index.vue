<template>
  <div>
    <a-card  style="text-align: left" title="书籍分类管理">
      <div>
        <a-input
          v-model:value="title"
          placeholder="输入书籍分类"
          style="width: 200px;"
        />
        &nbsp;
        <a-button @click="add" type="primary">添加</a-button>
      </div>

      <a-divider />

      <div>
        <a-table
          bordered
          :data-source="list"
          :columns="columns"
          :pagination="false"
        >
          <template #actions="{ record }">
            <a-button
              size="small"
              @click="updateTitle(record)"
              type="primary"
            >
              修改
            </a-button>
            &nbsp;
            <a-button
              size="small"
              @click="remove(record)"
              type="primary"
              danger
            >
              删除
            </a-button>
          </template>
        </a-table>
      </div>
    </a-card>
  </div>
</template>

<script src="./index.jsx"></script>
