// @ts-ignore: no type declarations for react-native-vector-icons submodules
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, Platform, StatusBar, FlatList, ScrollView, Modal } from 'react-native';

const demoComments = [
  {
    id: '1',
    user: 'BadgersBabble',
    neighborhood: 'Brooklyn',
    time: '2 hours ago',
    avatar: 'https://randomuser.me/api/portraits/lego/4.jpg',
    text: `Yes, I’ve noticed that too! The crosswalk signs near the school are really hard to see, especially in the mornings. It would be great if the city could repaint or replace them soon.`,
    replies: [
      {
        id: '1r',
        user: 'IllustriousRun',
        neighborhood: 'Riverdale',
        time: '1 hour ago',
        avatar: 'https://randomuser.me/api/portraits/lego/3.jpg',
        text: `I agree, it’s becoming a safety issue. Maybe we can report it to the city’s maintenance department or...`,
      },
    ],
  },
];

const initialPosts = [
  {
    id: '1',
    user: 'IceWrestlers',
    neighborhood: 'Brooklyn',
    time: '2 hrs ago',
    avatar: 'https://randomuser.me/api/portraits/lego/5.jpg',
    image: 'https://blogs.nottingham.ac.uk/primaryeducationnetwork/files/2021/07/school-sign-683x1024.jpg',
    text: `I was walking my daughter to school and noticed that the crosswalk signs are very faded, my concern is that drivers won’t be able to see them from afar. Any parents have the same concern?`,
    upvotes: 43,
    downvotes: 5,
    comments: 16,
    aiSolution: `The city could schedule a quick repainting of the faded crosswalk signs near the school and consider adding reflective paint or solar-powered flashing lights for better visibility. This would improve safety for students and ensure drivers can clearly see the crossings, especially during early morning hours.`,
    upvoted: false,
    downvoted: false,
  },
  {
    id: '2',
    user: 'ToothKindle',
    neighborhood: 'Brooklyn',
    time: '3 min ago',
    avatar: 'https://randomuser.me/api/portraits/lego/4.jpg',
    image: 'https://wheninavl.com/wp-content/uploads/french-broad-river-park-sidewalk.jpg',
    text: 'Spring at Brookside park 🌸. The community cleanup truly made a difference!',
    upvotes: 12,
    downvotes: 3,
    comments: 1,
    aiSolution: '',
    upvoted: false,
    downvoted: false,
  },
];

const FeedScreen = () => {
  const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0;
  const [posts, setPosts] = useState(initialPosts);
  const [selectedPost, setSelectedPost] = useState(null);

  const handleThumb = (postId, type) => {
    setPosts(posts =>
      posts.map(post => {
        if (post.id !== postId) return post;
        if (type === 'up') {
          const wasUp = post.upvoted;
          const wasDown = post.downvoted;
          return {
            ...post,
            upvoted: !wasUp,
            downvoted: false,
            upvotes: wasUp ? post.upvotes - 1 : post.upvotes + 1,
            downvotes: wasDown ? post.downvotes - 1 : post.downvotes,
          };
        } else {
          const wasUp = post.upvoted;
          const wasDown = post.downvoted;
          return {
            ...post,
            upvoted: false,
            downvoted: !wasDown,
            upvotes: wasUp ? post.upvotes - 1 : post.upvotes,
            downvotes: wasDown ? post.downvotes - 1 : post.downvotes + 1,
          };
        }
      })
    );
  };

  const renderReplies = (replies) =>
    replies?.map((reply) => (
      <View key={reply.id} style={styles.replyContainer}>
        <Image source={{ uri: reply.avatar }} style={styles.avatarSmall} />
        <View style={styles.replyContent}>
          <Text style={styles.commentUser}>
            <Text style={{ fontWeight: 'bold' }}>{reply.user}</Text>
            <Text style={styles.commentNeighborhood}> in {reply.neighborhood}</Text>
          </Text>
          <Text style={styles.commentTime}>{reply.time}</Text>
          <Text style={styles.commentText}>{reply.text}</Text>
        </View>
      </View>
    ));

  const renderComment = ({ item }) => (
    <View style={styles.commentContainer}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.commentContent}>
        <Text style={styles.commentUser}>
          <Text style={{ fontWeight: 'bold' }}>{item.user}</Text>
          <Text style={styles.commentNeighborhood}> in {item.neighborhood}</Text>
        </Text>
        <Text style={styles.commentTime}>{item.time}</Text>
        <Text style={styles.commentText}>{item.text}</Text>
        {renderReplies(item.replies)}
      </View>
    </View>
  );

  const renderFeedPost = ({ item, index }) => (
    <>
      <View style={styles.flatPost}>
        <View style={styles.postHeader}>
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
          <View style={{ flex: 1 }}>
            <Text style={styles.postUser}>
              <Text style={{ fontWeight: 'bold' }}>{item.user}</Text>
              <Text style={styles.commentNeighborhood}> in {item.neighborhood}</Text>
            </Text>
            <Text style={styles.postTime}>{item.time}</Text>
          </View>
          <MaterialIcons name="dots-horizontal" size={22} color="#555" style={{ marginLeft: 10 }} />
        </View>
        {item.image ? <Image source={{ uri: item.image }} style={styles.postImage} /> : null}
        <Text style={styles.postText}>{item.text}</Text>
        <View style={styles.postActions}>
          <TouchableOpacity style={styles.iconBtn} onPress={() => handleThumb(item.id, 'up')}>
            <MaterialIcons
              name="thumb-up-outline"
              size={20}
              color={item.upvoted ? "#2ecc40" : "#757575"}
            />
            <Text style={[styles.iconCount, { color: item.upvoted ? "#2ecc40" : "#757575" }]}>{item.upvotes}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn} onPress={() => handleThumb(item.id, 'down')}>
            <MaterialIcons
              name="thumb-down-outline"
              size={20}
              color={item.downvoted ? "#e74c3c" : "#757575"}
            />
            <Text style={[styles.iconCount, { color: item.downvoted ? "#e74c3c" : "#757575" }]}>{item.downvotes}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn} onPress={() => setSelectedPost(item)}>
            <MaterialIcons name="comment-outline" size={20} color="#757575" />
            <Text style={styles.iconBtnText}>{item.comments}</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Separator (except after last post) */}
      {index < posts.length - 1 && <View style={styles.feedSeparator} />}
    </>
  );

  const renderPostDetail = (post) => (
    <Modal visible={!!post} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <ScrollView style={{ backgroundColor: '#fff', borderRadius: 16, flex: 1 }} contentContainerStyle={{ paddingBottom: 32 }}>
          <TouchableOpacity onPress={() => setSelectedPost(null)}>
            <Text style={styles.closeButton}>Close</Text>
          </TouchableOpacity>
          <View style={[styles.flatPost, styles.detailPostCard]}>
            <View style={styles.postHeader}>
              <Image source={{ uri: post.avatar }} style={styles.avatar} />
              <View style={{ flex: 1 }}>
                <Text style={styles.postUser}>
                  <Text style={{ fontWeight: 'bold' }}>{post.user}</Text>
                  <Text style={styles.commentNeighborhood}> in {post.neighborhood}</Text>
                </Text>
                <Text style={styles.postTime}>{post.time}</Text>
              </View>
              <MaterialIcons name="dots-horizontal" size={22} color="#555" style={{ marginLeft: 10 }} />
            </View>
            {post.image ? <Image source={{ uri: post.image }} style={styles.postImage} /> : null}
            <Text style={styles.postText}>{post.text}</Text>
            <View style={[styles.postActions, { marginTop: 12 }]}>
              <TouchableOpacity style={styles.iconBtn} onPress={() => handleThumb(post.id, 'up')}>
                <MaterialIcons
                  name="thumb-up-outline"
                  size={20}
                  color={post.upvoted ? "#2ecc40" : "#757575"}
                />
                <Text style={[styles.iconCount, { color: post.upvoted ? "#2ecc40" : "#757575" }]}>{post.upvotes}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconBtn} onPress={() => handleThumb(post.id, 'down')}>
                <MaterialIcons
                  name="thumb-down-outline"
                  size={20}
                  color={post.downvoted ? "#e74c3c" : "#757575"}
                />
                <Text style={[styles.iconCount, { color: post.downvoted ? "#e74c3c" : "#757575" }]}>{post.downvotes}</Text>
              </TouchableOpacity>
              <View style={styles.iconBtn}>
                <MaterialIcons name="comment-outline" size={20} color="#757575" />
                <Text style={styles.iconBtnText}>{post.comments}</Text>
              </View>
            </View>
          </View>
          {post.aiSolution ? (
            <View style={styles.aiSolutionCard}>
              <Text style={styles.aiSolutionHeader}>🧠 AI Suggested Solution:</Text>
              <Text style={styles.aiSolutionText}>{post.aiSolution}</Text>
            </View>
          ) : null}
          <View style={styles.commentsHeaderRow}>
            <Text style={styles.commentsHeader}>Comments</Text>
            <Text style={styles.commentsCount}>{post.comments} replies</Text>
            <MaterialIcons name="dots-horizontal" size={20} color="#555" style={{ marginLeft: 'auto' }} />
          </View>
          <FlatList
            data={demoComments}
            keyExtractor={item => item.id}
            renderItem={renderComment}
            contentContainerStyle={{ paddingBottom: 64 }}
            scrollEnabled={false}
          />
        </ScrollView>
      </View>
    </Modal>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#ffe22a' }}>
      <StatusBar translucent backgroundColor="#ffe22a" barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1, backgroundColor: '#ffe22a' }}>
        <View style={[styles.headerWrapper, { paddingTop: statusBarHeight }]}>
          <View style={styles.headerContent}>
            <MaterialIcons name="shield-outline" size={28} color="#120c00" />
            <Text style={styles.title}>AGORA AI</Text>
            <MaterialIcons name="account" size={28} color="#120c00" />
          </View>
        </View>
        <FlatList
          data={posts}
          keyExtractor={item => item.id}
          style={{ backgroundColor: '#fff' }}
          contentContainerStyle={{ paddingBottom: 22, paddingTop: 16 }}
          renderItem={renderFeedPost}
          showsVerticalScrollIndicator={false}
        />
        {selectedPost && renderPostDetail(posts.find(p => p.id === selectedPost.id))}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.13)',
    paddingTop: Platform.OS === 'android' ? 28 : 0,
  },
  headerWrapper: {
    backgroundColor: '#ffe22a',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    elevation: 4,
    marginBottom: 8,
    paddingBottom: 6,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 54,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#120c00',
    letterSpacing: 1,
  },
   flatPost: {
    paddingHorizontal: 22,
    paddingTop: 16,
    paddingBottom: 18,
    backgroundColor: '#fff',
  },
  detailPostCard: {
    marginTop: 0,
    marginBottom: 8,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  feedSeparator: {
    height: 1,
    width: '100%',
    backgroundColor: '#E9EAEF',
    marginLeft: 0,
    marginRight: 0,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
    backgroundColor: '#eee',
  },
  postUser: {
    color: '#000',
    fontSize: 15,
  },
  postTime: {
    color: '#8C8C8C',
    fontSize: 13,
    marginTop: 2,
    marginBottom: 0,
  },
  postImage: {
    width: '100%',
    height: 175,
    resizeMode: 'cover',
    borderRadius: 12,
    marginBottom: 15,
    marginTop: 8,
    backgroundColor: '#e9e9e9',
  },
  postText: {
    fontSize: 16, // slightly larger text
    color: '#242424',
    marginBottom: 12,
    marginTop: 2,
    lineHeight: 24, // more breathing room per line
    letterSpacing: 0.1,
  },
  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 2,
    justifyContent: 'flex-end',
    paddingRight: 4, // if you like a little extra clearance
  },
  iconBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 23,
  },
  iconBtnText: {
    fontSize: 15,
    color: '#757575',
    marginLeft: 5,
  },
  iconCount: {
    fontSize: 14,
    marginLeft: 3,
  },
  closeButton: {
    color: '#3476fc',
    padding: 16,
    fontWeight: 'bold',
    fontSize: 17,
    alignSelf: 'flex-end',
    marginBottom: 4,
    marginTop: 10,
  },
  aiSolutionCard: {
    backgroundColor: '#F7F6F9',
    marginHorizontal: 18,
    borderRadius: 15,
    padding: 15,
    marginBottom: 18,
    borderLeftWidth: 3,
    borderLeftColor: '#9967EA',
    marginTop: 12,
  },
  aiSolutionHeader: {
    fontWeight: 'bold',
    color: '#9b2be8',
    marginBottom: 7,
    fontSize: 15,
  },
  aiSolutionText: {
    fontSize: 15,
    color: '#565687',
    lineHeight: 19,
  },
  commentsHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 1,
    marginTop: 0,
  },
  commentsHeader: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#212121',
    marginRight: 8,
  },
  commentsCount: {
    fontSize: 14,
    color: '#8c8c8c',
    marginRight: 4,
  },
  commentContainer: {
    flexDirection: 'row',
    marginTop: 18,
    marginHorizontal: 18,
  },
  commentContent: {
    marginLeft: 10,
    flex: 1,
    backgroundColor: '#f7f7fa',
    borderRadius: 11,
    padding: 10,
    paddingLeft: 14,
  },
  commentUser: {
    color: '#000',
    fontSize: 14,
  },
  commentNeighborhood: {
    color: '#7e7e7e',
    fontWeight: '400',
    fontSize: 13,
  },
  commentTime: {
    color: '#8C8C8C',
    fontSize: 12,
    marginBottom: 2,
    marginTop: 1,
  },
  commentText: {
    fontSize: 14,
    color: '#242424',
    marginBottom: 3,
    lineHeight: 17,
    marginTop: 2,
  },
  replyContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 10,
    marginLeft: 38,
    marginBottom: 0,
  },
  avatarSmall: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#eee',
  },
  replyContent: {
    marginLeft: 8,
    flex: 1,
    backgroundColor: '#f4f4f9',
    borderRadius: 10,
    padding: 7,
    paddingLeft: 12,
  },
});

export default FeedScreen;
