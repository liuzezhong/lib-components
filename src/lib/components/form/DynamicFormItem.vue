<template>
    <el-form-item
        class="dynamic-form-item"
        :prop="prop"
        :label="label"
        :label-width="labelWidth"
        :rules="itemRules" >
        <el-input
            v-if="type === ITEM_TYPE.INPUT"
            v-model="dynamicForm.item.value"
            :placeholder="dynamicForm.item.tip"
            :disabled="dynamicForm.item.disabled"
            :size="dynamicForm.item.size"
            :maxlength="dynamicForm.item.maxLength"
            @blur="itemBlur()"
            @change="itemChange()"
            clearable />
    </el-form-item>
</template>

<script>
import { ITEM_TYPE } from '../../constants';

export default {
    name: 'DynamicFormItem',
    props: {
        dynamicForm: {
            type: Object,
            default: () => {}
        },
        prop: {
            type: String,
            required: false
        },
        label: {
            type: String,
            required: false
        },
        labelWidth: {
            type: String,
            required: false
        },
        type: {
            type: String,
            required: false,
            default: () => ITEM_TYPE.INPUT
        }
    },
    methods: {
        async itemBlur() {
            console.log('itemBlur', this);
        },
        async itemChange() {
            console.log('itemChange', this);
        },

        get itemRules() {
            const self = this;
            if (!isEmpty(self.rules)) {
                return self.rules;
            }
            // find form
            let parent = self.$parent;
            let parentName = parent.$options.name;
            while (parentName !== 'ElForm') {
                parent = parent.$parent;
                parentName = parent.$options.name;
            }
            const form = parent;

            let rule = [];
            let parentRules = [];
            parent = self.$parent;
            parentName = parent.$options.name;
            let isChildrenItem = false;
            while (parentName !== 'ElForm') {
                parent = parent.$parent;
                parentName = parent.$options.name;
                if (parentName === 'ElFormItem' || parentName === 'DynamicObjectItem') {
                    if (isEmpty(parentRules) && !isEmpty(parent.rules)) {
                        parentRules = parent.rules;
                    }
                    isChildrenItem = true;
                }
            }
            if (isEmpty(parentRules)) {
                parentRules = form.rules;
            }
            if (isChildrenItem) {
                const itemName = self.name || '';
                if (itemName.match(/\.\d+\./)) {
                    const names = itemName.split('.');
                    let nameIndex = 0;
                    if (names.length >= 2 && Number(names[1]) >= 0) {
                        let lookupName = names.shift();
                        rule = parentRules;
                        while (rule !== undefined && !isEmpty(lookupName)) {
                            let findRule = rule[`${lookupName}`];
                            if (findRule === undefined) {
                                if (Number(lookupName) >= 0 && nameIndex === 1) {
                                    if (isArray(rule)) {
                                        findRule = rule.find(() => true);
                                    }
                                    if (isObject(rule) && !isArray(rule)) {
                                        findRule = rule;
                                    }
                                }
                            }
                            rule = findRule;
                            lookupName = names.shift();
                            nameIndex += 1;
                        }
                    }
                }
            } else {
                rule = form.rules[`${self.name}`];
            }
            return rule;
        }
    }
};
</script>
