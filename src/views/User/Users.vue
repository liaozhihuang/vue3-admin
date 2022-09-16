<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item>用户列表1</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<el-card>
			<el-row class="handle-box">
				<el-col :span="0" class="mr10">
					<el-button type="primary" @click="addDialog">添加用户</el-button>
				</el-col>
				<el-col :span="6">
					<el-input placeholder="请输入内容" clearable @clear="getUserList" v-model="queryInfo.query">
						<template #append>
							<el-button icon="el-icon-search" @click="getUserList"></el-button>
						</template>
					</el-input>
				</el-col>

			</el-row>
			<el-table :data="userList" border stripe style="width: 100%">
				<el-table-column align="center" type="index"></el-table-column>
				<el-table-column align="center" prop="username" label="姓名"></el-table-column>
				<el-table-column align="center" prop="email" label="邮箱"></el-table-column>
				<el-table-column align="center" prop="mobile" label="电话"></el-table-column>
				<el-table-column align="center" prop="role_name" label="角色"></el-table-column>
				<el-table-column align="center" label="状态">
					<template #default="scope">
						<el-switch v-model="scope.row.mg_state" @change="userStateChanged(scope.row)"></el-switch>
					</template>
				</el-table-column>
				<el-table-column align="center" label="操作">
					<!-- 编辑用户 -->
					<template #default="scope">
						<el-button type="primary" icon="el-icon-edit" @click="showEditDialog(scope.row.id)" size="mini">
						</el-button>
						<!-- 删除用户 -->
						<el-button type="danger" @click="delUser(scope.row.id)" icon="el-icon-delete" size="mini">
						</el-button>
						<!-- 分配角色 -->
						<el-tooltip :enterable="false" effect="dark" content="分配角色" placement="top-start">
							<el-button type="warning" icon="el-icon-setting" size="mini" @click="setRole(scope.row)">
							</el-button>
						</el-tooltip>
					</template>
				</el-table-column>
			</el-table>
			<div class="pagination">
				<el-pagination background @current-change="handleCurrentChange" :current-page="queryInfo.pagenum"
					:page-size="queryInfo.pagesize" layout="total, prev, pager, next" :total="total">
				</el-pagination>
			</div>

		</el-card>

		<add-user :id="id" :addDialogVisible="addDialogVisible" @getUserList="getUserList"
			@closeAddDialog="closeAddDialog">
		</add-user>

		<set-role :id="id" :userInfo="userInfo" :setRoleDialogVisible="setRoleDialogVisible"
			@closeRoleDialog="closeRoleDialog">
		</set-role>
	</div>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import { getUsers, updateUserState, deleteUser } from "@/api/user";
// import { ElMessage, ElMessageBox } from "element-plus";
import AddUser from "@/views/User/AddUser.vue";
import SetRole from "@/views/User/SetRole.vue";
export default defineComponent({
	name: "UserList",
	components: {
		AddUser,
		SetRole,
	},
	setup() {
		const queryInfo = ref({
			query: "",
			pagenum: 1,
			pagesize: 2,
		});
		const userList = ref([]);
		const total = ref(0);
		const addDialogVisible = ref(false);
		const setRoleDialogVisible = ref(false);
		const id = ref("");
		const userInfo = ref({});

		const getUserList = async () => {
			const { data: res } = await getUsers(queryInfo.value);
			if (res.meta.status === 200) {
				userList.value = res.data.users;
				total.value = res.data.total;
			}
		};

		const handleCurrentChange = (newPage: number) => {
			queryInfo.value.pagenum = newPage;
			getUserList();
		};

		const userStateChanged = async (userinfo: any) => {
			const { data } = await updateUserState(userinfo.id, "abc");
			if (data.meta.status === 200) {
				ElMessage({
					type: "success",
					showClose: true,
					message: data.meta.msg,
				});
			}
		};

		const delUser = (id: string) => {
			ElMessageBox.confirm("此操作将永久删除该用户, 是否继续?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
			})
				.then(async () => {
					const { data } = await deleteUser(id);
					if (data.meta.status === 200) {
						ElMessage({
							type: "success",
							showClose: true,
							message: data.meta.msg,
						});
						await getUserList();
					}
				})
				.catch(() => {
					ElMessage({
						type: "info",
						showClose: true,
						message: "您已取消删除",
					});
				});
		};

		const addDialog = () => {
			addDialogVisible.value = true;
		};

		const closeAddDialog = () => {
			addDialogVisible.value = false;
			id.value = "";
		};
		const showEditDialog = (rowId: string) => {
			addDialog();
			id.value = rowId;
		};

		const setRole = (row: any) => {
			setRoleDialogVisible.value = true;
			userInfo.value = row;
			id.value = row.id;
		};

		const closeRoleDialog = () => {
			setRoleDialogVisible.value = false;
			userInfo.value = {};
		};
		getUserList();

		return {
			queryInfo,
			userList,
			total,
			addDialogVisible,
			setRoleDialogVisible,
			id,
			userInfo,
			getUserList,
			handleCurrentChange,
			userStateChanged,
			delUser,
			addDialog,
			closeAddDialog,
			showEditDialog,
			setRole,
			closeRoleDialog,
		};
	},
});
</script>

<style lang="scss" scoped>
.mr10 {
	margin-right: 10px;
}
</style>
