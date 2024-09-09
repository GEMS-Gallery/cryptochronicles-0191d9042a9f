import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box } from '@mui/material';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

interface PostFormProps {
  onSubmit: (title: string, body: string, author: string) => void;
}

const PostForm: React.FC<PostFormProps> = ({ onSubmit }) => {
  const { control, handleSubmit, reset } = useForm();

  const onSubmitForm = (data: any) => {
    const htmlBody = draftToHtml(convertToRaw(data.body.getCurrentContent()));
    onSubmit(data.title, htmlBody, data.author);
    reset();
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmitForm)} sx={{ mb: 4 }}>
      <Controller
        name="title"
        control={control}
        defaultValue=""
        rules={{ required: 'Title is required' }}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            label="Title"
            fullWidth
            margin="normal"
            error={!!error}
            helperText={error?.message}
          />
        )}
      />
      <Controller
        name="body"
        control={control}
        defaultValue={EditorState.createEmpty()}
        rules={{ required: 'Body is required' }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <Editor
              editorState={value}
              onEditorStateChange={onChange}
              wrapperClassName="wrapper-class"
              editorClassName="editor-class"
              toolbarClassName="toolbar-class"
            />
            {error && (
              <Typography color="error" variant="caption">
                {error.message}
              </Typography>
            )}
          </>
        )}
      />
      <Controller
        name="author"
        control={control}
        defaultValue=""
        rules={{ required: 'Author is required' }}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            label="Author"
            fullWidth
            margin="normal"
            error={!!error}
            helperText={error?.message}
          />
        )}
      />
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Submit Post
      </Button>
    </Box>
  );
};

export default PostForm;
