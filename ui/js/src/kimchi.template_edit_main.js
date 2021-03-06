/*
 * Project Kimchi
 *
 * Copyright IBM, Corp. 2013
 *
 * Authors:
 *  Hongliang Wang <hlwanghl@cn.ibm.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
kimchi.template_edit_main = function() {
    var templateEditForm = $('#form-template-edit');
    $('#template-name', templateEditForm).val(kimchi.selectedTemplate);
    kimchi.retrieveTemplate(kimchi.selectedTemplate, function(template) {
        for ( var prop in template) {
            $('input[name="' + prop + '"]', templateEditForm).val(template[prop]);
        }
    });

    $('#tmpl-edit-button-cancel').on('click', function() {
        kimchi.window.close();
    });

    $('#tmpl-edit-button-save').on('click', function() {
        var editableFields = [ 'name', 'cpus', 'memory' ];
        var data = {};
        $.each(editableFields, function(i, field) {
            data[field] = $('#form-template-edit [name="' + field + '"]').val();
        });
        kimchi.updateTemplate($('#template-name').val(), data, function() {
            kimchi.doListTemplates();
            kimchi.window.close();
        }, function(err) {
            kimchi.message.error(err.responseJSON.reason);
        });
    });
};
